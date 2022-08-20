import { Invoice } from "src/model/invoice";
import { prismaClient } from "../../database/prisma-client";
import { InvoicesRepository } from "../invoices-repository";

export class PrismaInvoicesRepository implements InvoicesRepository {
  async create({invoice_number, invoice_value, description, 
                  competition_month, receipt_date, company_id}: Invoice) {
    const invoiceCreated = await prismaClient.invoice.create({
      data:{
        invoice_number,
        invoice_value,
        description,
        competition_month,
        receipt_date,
        company_id
      }
    });

    return invoiceCreated;
  }

  async update({id, invoice_number, invoice_value, description, 
                  competition_month, receipt_date, company_id}: Invoice){
    const invoiceUpdated = await prismaClient.invoice.update({
      where: {id: id},
      data: {
        invoice_number: invoice_number,
        invoice_value: invoice_value,
        description: description,
        competition_month: competition_month,
        receipt_date: receipt_date,
        company_id: company_id
      }
    });

    return invoiceUpdated;
  }

  async delete(invoice_id: string){
    const invoiceDeleted = await prismaClient.invoice.delete({
      where: {id: invoice_id}
    });

    return invoiceDeleted;
  }

  async findById(invoice_id: string){
    const invoice = await prismaClient.invoice.findFirst({
      where: {id: invoice_id}
    });

    return invoice;
  }

  async findByInvoiceNumber(invoice_number: string){
    const invoice = await prismaClient.invoice.findFirst({
      where: {invoice_number: invoice_number}
    });

    return invoice;
  }

  async findByReceiptDate(receipt_date: Date){
    const invoice = await prismaClient.invoice.findFirst({
      where: {receipt_date: receipt_date}
    });

    return invoice;
  }

  async allInvoices(){
    return await prismaClient.invoice.findMany();
  }
}