import express from 'express';

import { UserController } from '@controllers/user-controller';
import { CompanyController } from '@controllers/company-controller';
import { InvoiceController } from '@controllers/invoice-controller';
import { CategoryController } from '@controllers/category-controller';
import { ExpenseController } from '@controllers/expense-controller';
import { CompanyPreferencesController } from '@controllers/company-preferences-controller';
import { AuthController } from '@controllers/auth-controller';

export const routes = express.Router();

const authController = new AuthController();
routes.post('/register', authController.register);
routes.post('/login', authController.login);

const authMiddleware = require('src/middlewares/auth');
routes.use(authMiddleware);

/************
 *** USER ***
 ************/
const userController = new UserController();
routes.get('/user/:id', userController.show);
routes.delete('/user/:id', userController.destroy);
routes.post('/user', userController.store);
routes.put('/user', userController.edit);

/***************
 *** COMPANY ***
 ***************/
const companyController = new CompanyController();
routes.get('/company/:id', companyController.show);
routes.delete('/company/:id', companyController.destroy);
routes.post('/company', companyController.store);
routes.put('/company', companyController.edit);

/***************************
 *** COMPANY PREFERENCES ***
 ***************************/
 const companyPreferencesController = new CompanyPreferencesController();
 routes.get('/company-preferences/:id', companyPreferencesController.show);
 routes.delete('/company-preferences/:id', companyPreferencesController.destroy);
 routes.post('/company-preferences', companyPreferencesController.store);
 routes.put('/company-preferences', companyPreferencesController.edit);

/***************
 *** INVOICE ***
 ***************/
const invoiceController = new InvoiceController();
routes.get('/invoice/:id', invoiceController.show);
routes.delete('/invoice/:id', invoiceController.destroy);
routes.post('/invoice', invoiceController.store);
routes.put('/invoice', invoiceController.edit);

/****************
 *** CATEGORY ***
 ***************/
 const categoryController = new CategoryController();
 routes.get('/category/:id', categoryController.show);
 routes.delete('/category/:id', categoryController.destroy);
 routes.post('/category', categoryController.store);
 routes.put('/category', categoryController.edit);

 /**************
 *** EXPENSE ***
 ***************/
const expenseController = new ExpenseController();
routes.get('/expense/:id', expenseController.show);
routes.delete('/expense/:id', expenseController.destroy);
routes.post('/expense', expenseController.store);
routes.put('/expense', expenseController.edit);