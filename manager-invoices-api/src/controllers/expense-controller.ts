import { Request, Response } from "express";
import { Expense } from "src/model/expense";
import { PrismaExpensesRepository } from "src/repositories/prisma/prisma-expenses-repository";
import { ExpensesService } from "src/services/expense-service";

export class ExpenseController {

  /**
   * Save a new expense
   * @param req 
   * @param res 
   * @returns 
   */
   async store(req: Request, res: Response){
    try {
      const expense = new Expense();
      expense.name = req.body.name;
      expense.expense_value = req.body.expense_value;
      expense.payment_date = req.body.payment_date;
      expense.competition_date = req.body.competition_date;
      expense.category_id = req.body.category_id;
      expense.company_id = req.body.company_id;
      
      let expensesService = new ExpensesService();
      const expenseCreated = await expensesService.save(expense);

      if(!expenseCreated){
        return res.status(404).send({'message': 'Could not create a new expense. Please, try again in few minutes'});
      }

      return res.status(201).send(expenseCreated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not create a new expense. ' + error});
    }
  }

  /**
   * Edit a exist expense
   * @param req 
   * @param res 
   * @returns 
   */
  async edit(req: Request, res: Response){
    try {
      const expense = new Expense();
      expense.id = req.body.id;
      expense.name = req.body.name;
      expense.expense_value = req.body.expense_value;
      expense.payment_date = req.body.payment_date;
      expense.competition_date = req.body.competition_date;
      expense.category_id = req.body.category_id;
      expense.company_id = req.body.company_id;
      
      let expensesService = new ExpensesService();
      const expenseUpdate = await expensesService.update(expense);

      return res.status(200).send(expenseUpdate);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not update the expense. ' + error});
    }
  }

  /**
   * Delete a exist expense by id
   * @param req 
   * @param res 
   * @returns 
   */
  async destroy(req: Request, res: Response){
    const id = req.params.id;

    if(!id){
      res.status(400).send('Id is required');
    }
    
    try {
      let expensesService = new ExpensesService();
      const expenseDeleted = await expensesService.delete(id);

      return res.status(200).send(expenseDeleted);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not delete the expense. ' + error});
    }
  }

  /**
   * Get a expense by id
   * @param req 
   * @param res 
   * @returns 
   */
  async show(req: Request, res: Response){
    let expensesRepository = new PrismaExpensesRepository();
    const expense = await expensesRepository.findById(req.params.id);
    return res.status(200).send(expense);
  }
}