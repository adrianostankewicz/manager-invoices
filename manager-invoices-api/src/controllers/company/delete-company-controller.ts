import { CompaniesRepository } from "src/repositories/companies-repository";

interface CompanyDeleteRequest {
  id: string
}

export class DeleteCompanyController {
  constructor(
    private companiesRepository: CompaniesRepository
  ){}

  async handle(request: CompanyDeleteRequest){
    const {id} = request;

    if(!id){
      throw new Error('Id is required');
    }

    return await this.companiesRepository.delete(id);
  }
}