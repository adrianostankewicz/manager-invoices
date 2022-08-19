import { prismaClient } from "../../database/prisma-client";
import { InvoiceData, InvoicesRepository } from "../invoices-repository";

export class PrismaInvoicesRepository implements InvoicesRepository {
  async create({invoice_number, invoice_value, description, 
                  competition_month, receipt_date, company}: InvoiceData) {
    const invoiceCreated = await prismaClient.invoice.create({
      data:{
        invoice_number,
        invoice_value,
        description,
        competition_month,
        receipt_date,
        company:{
          
        }
      }
    });

    return companyCreated;
  }

  async update({id, social_name, cnpj, email, status, owner}: CompanyData){
    const companyUpdated = await prismaClient.company.update({
      where: {id: id},
      data: {
        social_name: social_name,
        cnpj: cnpj, 
        email: email,
        status: status,
        owner: owner
      }
    });

    return companyUpdated;
  }

  async delete(company_id: string){
    const companyDeleted = await prismaClient.company.delete({
      where: {id: company_id}
    });

    return companyDeleted;
  }

  async findById(company_id: string){
    const company = await prismaClient.company.findFirst({
      where: {id: company_id}
    });

    return company;
  }

  async findBySocialName(social_name: string){
    const company = await prismaClient.company.findFirst({
      where: {social_name: social_name}
    });

    return company;
  }

  async findByCnpj(cnpj: number){
    const company = await prismaClient.company.findFirst({
      where: {cnpj: cnpj}
    });

    return company;
  }

  async allCompanies(){
    return await prismaClient.company.findMany();
  }
}