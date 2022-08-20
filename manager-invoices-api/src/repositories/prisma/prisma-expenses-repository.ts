import { prismaClient } from "src/database/prisma-client";
import { Expense } from "src/model/expense";
import { ExpensesRepository } from "../expenses-repository";

export class PrismaExpensesRepository implements ExpensesRepository {
  async create({name, expense_value, payment_date, competition_date, 
                  category_id, company_id}: Expense) {
    const expenseCreated = await prismaClient.expense.create({
      data:{
        name,
        expense_value,
        payment_date,
        competition_date,
        category_id,
        company_id
      }
    });

    return expenseCreated;
  }

  async update({id, name, expense_value, payment_date, competition_date, 
    category_id, company_id}: Expense){
    const expenseUpdated = await prismaClient.expense.update({
      where: {id: id},
      data: {
        name: name,
        expense_value: expense_value,
        payment_date: payment_date,
        competition_date: competition_date,
        category_id: category_id,
        company_id: company_id
      }
    });

    return expenseUpdated;
  }

  async delete(expense_id: string){
    const expenseDeleted = await prismaClient.expense.delete({
      where: {id: expense_id}
    });

    return expenseDeleted;
  }

  async findById(expense_id: string){
    const expense = await prismaClient.expense.findFirst({
      where: {id: expense_id}
    });

    return expense;
  }

  async findByName(name: string){
    const expense = await prismaClient.expense.findFirst({
      where: {name: name}
    });

    return expense;
  }

  async allExpenses(){
    return await prismaClient.expense.findMany();
  }
}