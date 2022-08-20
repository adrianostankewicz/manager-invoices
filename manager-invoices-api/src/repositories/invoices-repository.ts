import { Invoice as InvoicePrisma } from "@prisma/client";
import { Invoice } from "src/model/invoice";

export interface InvoicesRepository {
  create: (data: Invoice) => Promise<InvoicePrisma>;
  update: (data: Invoice) => Promise<InvoicePrisma>;
  delete: (id: string) => Promise<InvoicePrisma>;
  findById: (id: string) => Promise<InvoicePrisma>;
  findByInvoiceNumber: (invoice_number: string) => Promise<InvoicePrisma>;
  findByReceiptDate: (receipt_date: Date) => Promise<InvoicePrisma>;
  allInvoices: () => Promise<InvoicePrisma[]>;
}