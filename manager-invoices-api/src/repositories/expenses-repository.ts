import { Expense as ExpensePrisma } from "@prisma/client";
import { Expense } from "src/model/expense";

export interface ExpensesRepository {
  create: (data: Expense) => Promise<ExpensePrisma>;
  update: (data: Expense) => Promise<ExpensePrisma>;
  delete: (id: string) => Promise<ExpensePrisma>;
  findById: (id: string) => Promise<ExpensePrisma>;
  findByName: (name: string) => Promise<ExpensePrisma>;
  allExpenses: () => Promise<ExpensePrisma[]>;
}