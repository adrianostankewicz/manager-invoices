export class Invoice {
  id?: string;
  invoice_number: string;
  invoice_value: number;
  description: string;
  competition_month: number;
  receipt_date: Date;
  company_id: string;
}