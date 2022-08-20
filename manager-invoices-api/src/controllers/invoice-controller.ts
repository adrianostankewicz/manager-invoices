import { Request, Response } from "express";
import { Invoice } from "src/model/invoice";
import { PrismaInvoicesRepository } from "src/repositories/prisma/prisma-invoices-repository";
import { InvoicesService } from "src/services/invoices-services";

export class InvoiceController {

  /**
   * Save a new invoice
   * @param req 
   * @param res 
   * @returns 
   */
   async store(req: Request, res: Response){
    try {
      const invoice = new Invoice();
      invoice.invoice_number = req.body.invoice_number;
      invoice.invoice_value = req.body.invoice_value;
      invoice.description = req.body.description;
      invoice.competition_month = req.body.competition_month;
      invoice.receipt_date = req.body.receipt_date;
      invoice.company_id = req.body.company_id;

      let invoicesService = new InvoicesService();
      const invoiceCreated = await invoicesService.save(invoice);

      if(!invoiceCreated){
        return res.status(404).send({'message': 'Could not create a new invoice. Please, try again in few minutes'});
      }

      return res.status(201).send(invoiceCreated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not create a new invoice. ' + error});
    }
  }

  /**
   * Edit a exist invoice
   * @param req 
   * @param res 
   * @returns 
   */
  async edit(req: Request, res: Response){
    try {
      const invoice = new Invoice();
      invoice.id = req.body.id;
      invoice.invoice_number = req.body.invoice_number;
      invoice.invoice_value = req.body.invoice_value;
      invoice.description = req.body.description;
      invoice.competition_month = req.body.competition_month;
      invoice.receipt_date = req.body.receipt_date;
      invoice.company_id = req.body.company_id;
      
      let invoicesService = new InvoicesService();
      const invoiceUpdated = await invoicesService.update(invoice);

      return res.status(200).send(invoiceUpdated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not update the invoice. ' + error});
    }
  }

  /**
   * Delete a exist invoice by id
   * @param req 
   * @param res 
   * @returns 
   */
  async destroy(req: Request, res: Response){
    const id = req.params.id;

    if(!id){
      res.status(400).send('Id is required');
    }
    
    try {
      let invoicesService = new InvoicesService();
      const invoiceDeleted = await invoicesService.delete(id);

      return res.status(200).send(invoiceDeleted);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not delete the invoice. ' + error});
    }
  }

  /**
   * Get a invoice by id
   * @param req 
   * @param res 
   * @returns 
   */
  async show(req: Request, res: Response){
    let invoicesRepository = new PrismaInvoicesRepository();
    const invoice = await invoicesRepository.findById(req.params.id);
    return res.status(200).send(invoice);
  }
}