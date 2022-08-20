import { CompanyPreferences } from "src/model/company-preferences";
import { CompanyPreferencesRepository } from "src/repositories/company-preferences-repository";
import { PrismaCompanyPreferencesRepository } from "src/repositories/prisma/prisma-company-preferences-repository";

export class CompanyPreferencesService {

  private companyPreferencesRepository: CompanyPreferencesRepository;

  constructor(){
    this.companyPreferencesRepository = new PrismaCompanyPreferencesRepository();
  }

  async save(companyPreferences: CompanyPreferences){

    if(!companyPreferences.billing_threshold){
      throw new Error('Billing Threshold is required');
    }

    const companyPreferencesCreated = await this.companyPreferencesRepository.create(companyPreferences);
    return companyPreferencesCreated;
  }

  async update(companyPreferences: CompanyPreferences){
    const companyPreferencesUpdate = await this.companyPreferencesRepository.findById(companyPreferences.id);

    if(!companyPreferencesUpdate){
      throw new Error('Company preferences do not exist');
    }

    const companyPreferencesUpdated = await this.companyPreferencesRepository.update(companyPreferences);

    return companyPreferencesUpdated;
  }
  
  async delete(id: string){
    const companyPreferencesDrop = await this.companyPreferencesRepository.findById(id);

    if(!companyPreferencesDrop){
      throw new Error('Company preferences do not exist');
    }

    const companyPreferencesDeleted = await this.companyPreferencesRepository.delete(id);

    return companyPreferencesDeleted;
  }
}