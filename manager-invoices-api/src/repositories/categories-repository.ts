import { Category as CategoryPrisma } from "@prisma/client";
import { Category } from "src/model/category";

export interface CategoriesRepository {
  create: (data: Category) => Promise<CategoryPrisma>;
  update: (data: Category) => Promise<CategoryPrisma>;
  delete: (id: string) => Promise<CategoryPrisma>;
  findById: (id: string) => Promise<CategoryPrisma>;
  findByName: (name: string) => Promise<CategoryPrisma>;
  findByStatus: (status: string) => Promise<CategoryPrisma>;
  allCategories: () => Promise<CategoryPrisma[]>;
}