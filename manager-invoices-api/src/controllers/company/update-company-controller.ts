import { CompaniesRepository } from "src/repositories/companies-repository";

interface CompanyUpdateRequest {
  id: string
  social_name: string;
  cnpj: number;
  email: string;
  status: string;
  owner: boolean;
}

export class UpdateCompanyController {
  constructor(
    private companiesRepository: CompaniesRepository
  ){}

  async handle(request: CompanyUpdateRequest){
    const {id, social_name, cnpj, email, status, owner} = request;

    if(!social_name){
      throw new Error('Name is required');
    }

    if(!email){
      throw new Error('Email is required');
    }

    if(!cnpj){
      throw new Error('CNPJ is required');
    }

    if(!owner){
      throw new Error('Owner is required');
    }

    const companyUpdated = await this.companiesRepository.update({
      id,
      social_name,
      cnpj,
      email,
      status,
      owner
    });

    return companyUpdated;
  }
}