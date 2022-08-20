import { Expense } from "src/model/expense";
import { ExpensesRepository } from "src/repositories/expenses-repository";
import { PrismaExpensesRepository } from "src/repositories/prisma/prisma-expenses-repository";

export class ExpensesService {

  private expensesRepository: ExpensesRepository;

  constructor(){
    this.expensesRepository = new PrismaExpensesRepository();
  }

  async save(expense: Expense){

    if(!expense.name){
      throw new Error('Name is required');
    }

    if(!expense.expense_value){
      throw new Error('Expense value is required');
    }

    if(!expense.payment_date){
      throw new Error('Payment date is required');
    }

    if(await this.expensesRepository.findByName(expense.name)){
      throw new Error('Expense already exist');
    }

    const expenseCreated = await this.expensesRepository.create(expense);
    return expenseCreated;
  }

  async update(expense: Expense){
    const expenseUpdate = await this.expensesRepository.findById(expense.id);

    if(!expenseUpdate){
      throw new Error('Expense do not exist');
    }

    if(expense.name !== expenseUpdate.name){
      throw new Error('Field name do not to updatable');
    }

    const expenseUpdated = await this.expensesRepository.update(expense);

    return expenseUpdated;
  }
  
  async delete(id: string){
    const expenseDrop = await this.expensesRepository.findById(id);

    if(!expenseDrop){
      throw new Error('Expense do not exist');
    }

    const expenseDeleted = await this.expensesRepository.delete(id);

    return expenseDeleted;
  }
}