import { CompaniesRepository } from "src/repositories/companies-repository";

interface CompanyCreateRequest {
  social_name: string;
  cnpj: number;
  email: string;
  owner: boolean;
}

export class CreateCompanyController {
  constructor(
    private companiesRepository: CompaniesRepository
  ){}

  async handle(request: CompanyCreateRequest){
    const {social_name, cnpj, email, owner} = request;

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

    const status = 'active';

    const companyCreated = await this.companiesRepository.create({
      social_name,
      cnpj,
      email,
      status,
      owner
    });

    return companyCreated;
  }
}