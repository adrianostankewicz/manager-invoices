import { Company as CompanyPrisma } from "@prisma/client";
import { Company } from "src/model/company";

export interface CompaniesRepository {
  create: (data: Company) => Promise<CompanyPrisma>;
  update: (data: Company) => Promise<CompanyPrisma>;
  delete: (id: string) => Promise<CompanyPrisma>;
  findById: (id: string) => Promise<CompanyPrisma>;
  findBySocialName: (social_name: string) => Promise<CompanyPrisma>;
  findByCnpj: (cnpj: string) => Promise<CompanyPrisma>;
  allCompanies: () => Promise<CompanyPrisma[]>;
}