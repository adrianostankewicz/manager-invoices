import { Invoice } from "src/model/invoice";
import { InvoicesRepository } from "src/repositories/invoices-repository";
import { PrismaInvoicesRepository } from "src/repositories/prisma/prisma-invoices-repository";

export class InvoicesService {

  private invoicesRepository: InvoicesRepository;

  constructor(){
    this.invoicesRepository = new PrismaInvoicesRepository();
  }

  async save(invoice: Invoice){

    if(!invoice.invoice_number){
      throw new Error('Invoice Number is required');
    }

    if(!invoice.invoice_value){
      throw new Error('Invoice value is required');
    }

    if(!invoice.receipt_date){
      throw new Error('Receipt date is required');
    }

    if(!invoice.company_id){
      throw new Error('Company is required');
    }

    if(await this.invoicesRepository.findByInvoiceNumber(invoice.invoice_number)){
      throw new Error('Invoice Number already exist');
    }

    const invoiceCreated = await this.invoicesRepository.create(invoice);
    return invoiceCreated;
  }

  async update(invoice: Invoice){
    const invoiceUpdate = await this.invoicesRepository.findById(invoice.id);

    if(!invoiceUpdate){
      throw new Error('Invoice do not exist');
    }

    if(invoice.invoice_number !== invoiceUpdate.invoice_number){
      throw new Error('Field invoice number do not to updatable');
    }

    const invoiceUpdated = await this.invoicesRepository.update(invoice);

    return invoiceUpdated;
  }
  
  async delete(id: string){
    const invoiceDrop = await this.invoicesRepository.findById(id);

    if(!invoiceDrop){
      throw new Error('Invoice do not exist');
    }

    const invoiceDeleted = await this.invoicesRepository.delete(id);

    return invoiceDeleted;
  }
}