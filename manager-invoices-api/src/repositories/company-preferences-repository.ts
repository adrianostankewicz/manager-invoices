import { CompanyPreferences as CompanyPreferencesPrisma } from "@prisma/client";
import { CompanyPreferences } from "src/model/company-preferences";

export interface CompanyPreferencesRepository {
  create: (data: CompanyPreferences) => Promise<CompanyPreferencesPrisma>;
  update: (data: CompanyPreferences) => Promise<CompanyPreferencesPrisma>;
  delete: (id: string) => Promise<CompanyPreferencesPrisma>;
  findById: (id: string) => Promise<CompanyPreferencesPrisma>;
  allCompanyPreferences: () => Promise<CompanyPreferencesPrisma[]>;
}