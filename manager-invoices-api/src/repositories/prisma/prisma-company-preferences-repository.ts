import { prismaClient } from "src/database/prisma-client";
import { CompanyPreferences } from "src/model/company-preferences";
import { CompanyPreferencesRepository } from "../company-preferences-repository";

export class PrismaCompanyPreferencesRepository implements CompanyPreferencesRepository {
  async create({billing_threshold, notifications_email, notifications_sms}: CompanyPreferences) {
    const companyPreferencesCreated = await prismaClient.companyPreferences.create({
      data:{
        billing_threshold,
        notifications_email,
        notifications_sms,
      }
    });

    return companyPreferencesCreated;
  }

  async update({id, billing_threshold, notifications_email, notifications_sms}: CompanyPreferences){
    const companyPreferencesUpdated = await prismaClient.companyPreferences.update({
      where: {id: id},
      data: {
        billing_threshold,
        notifications_email,
        notifications_sms,
      }
    });

    return companyPreferencesUpdated;
  }

  async delete(company_preferences_id: string){
    const companyPreferencesDeleted = await prismaClient.companyPreferences.delete({
      where: {id: company_preferences_id}
    });

    return companyPreferencesDeleted;
  }

  async findById(company_preferences_id: string){
    const company_preferences = await prismaClient.companyPreferences.findFirst({
      where: {id: company_preferences_id}
    });

    return company_preferences;
  }

  async allCompanyPreferences(){
    return await prismaClient.companyPreferences.findMany();
  }
}