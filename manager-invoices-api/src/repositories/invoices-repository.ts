import { Company, Invoice } from "@prisma/client";

export interface InvoiceData {
  id?: string
  invoice_number: string;
  invoice_value: number;
  description: string;
  competition_month: number;
  receipt_date: Date;
  id_company: string
}

export interface InvoicesRepository {
  create: (data: InvoiceData) => Promise<Invoice>;
  update: (data: InvoiceData) => Promise<Invoice>;
  delete: (id: string) => Promise<Invoice>;
  findById: (id: string) => Promise<Invoice>;
  findByInvoiceNumber: (invoice_number: string) => Promise<Invoice>;
  findByReceiptDate: (receipt_date: Date) => Promise<Invoice>;
  allInvoices: () => Promise<Invoice[]>;
}