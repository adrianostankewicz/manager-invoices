import { Company } from "@prisma/client";

export interface CompanyData {
  id?: string;
  social_name: string;
  cnpj: number;
  email: string;
  status: string;
  owner: boolean;
}

export interface CompaniesRepository {
  create: (data: CompanyData) => Promise<Company>;
  update: (data: CompanyData) => Promise<Company>;
  delete: (id: string) => Promise<Company>;
  findById: (id: string) => Promise<Company>;
  findBySocialName: (social_name: string) => Promise<Company>;
  findByCnpj: (cnpj: number) => Promise<Company>;
  allCompanies: () => Promise<Company[]>;
}