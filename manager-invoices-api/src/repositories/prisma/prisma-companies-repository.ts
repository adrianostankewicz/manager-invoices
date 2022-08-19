import { prismaClient } from "../../database/prisma-client";
import { CompanyData, CompaniesRepository } from "../companies-repository";

export class PrismaCompaniesRepository implements CompaniesRepository {
  async create({social_name, cnpj, email, status, owner}: CompanyData) {
    const companyCreated = await prismaClient.company.create({
      data:{
        social_name,
        cnpj,
        email,
        status,
        owner
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