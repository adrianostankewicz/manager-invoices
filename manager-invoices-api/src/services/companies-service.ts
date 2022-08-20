import { Company } from "src/model/company";
import { CompaniesRepository } from "src/repositories/companies-repository";
import { PrismaCompaniesRepository } from "src/repositories/prisma/prisma-companies-repository";

export class CompaniesService {

  private companiesRepository: CompaniesRepository;

  constructor(){
    this.companiesRepository = new PrismaCompaniesRepository();
  }

  async save(company: Company){

    if(!company.social_name){
      throw new Error('Social Name is required');
    }

    if(!company.email){
      throw new Error('Email is required');
    }

    if(!company.cnpj){
      throw new Error('CNPJ is required');
    }

    if(await this.companiesRepository.findByCnpj(company.cnpj)){
      throw new Error('Company already exist');
    }

    const userCreated = await this.companiesRepository.create(company);
    return userCreated;
  }

  async update(company: Company){
    const companyUpdate = await this.companiesRepository.findById(company.id);

    if(!companyUpdate){
      throw new Error('Company do not exist');
    }

    if(company.cnpj !== companyUpdate.cnpj){
      throw new Error('Field cnpj do not to updatable');
    }

    const userUpdated = await this.companiesRepository.update(company);

    return userUpdated;
  }
  
  async delete(id: string){
    const companyDrop = await this.companiesRepository.findById(id);

    if(!companyDrop){
      throw new Error('Company do not exist');
    }

    const companyDeleted = await this.companiesRepository.delete(id);

    return companyDeleted;
  }
}