import express from 'express';
import { CreateUserController } from '@controllers/user/create-user-controller';
import { UpdateUserController } from '@controllers/user/update-user-controller';
import { DeleteUserController } from '@controllers/user/delete-user-controller';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';

import { CreateCompanyController } from '@controllers/company/create-company-controller';
import { UpdateCompanyController } from '@controllers/company/update-company-controller';
import { DeleteCompanyController } from '@controllers/company/delete-company-controller';
import { PrismaCompaniesRepository } from './repositories/prisma/prisma-companies-repository';
import { UserController } from '@controllers/user/user-controller';

export const routes = express.Router();

/************
 *** USER ***
 ************/

//User CREATE and UPDATE
const userController = new UserController();
routes.get('/user/:id', userController.show);
routes.delete('/user/:id', userController.destroy);
routes.post('/user', userController.store);
routes.put('/user', userController.edit);
/*
//User GET and DELETE by id
routes.route('/user/:id')
  .get(async (req, res) => {
    const id = req.params.id;
    try{
      const prismaUsersRepository = new PrismaUsersRepository();
      let user = null;

      if(id){
        user = await prismaUsersRepository.findById(id);
      }

      return res.status(201).send((!user ? {"message": "Nenhum usuário encontrado"}: user));
    } catch(err){
      console.log(err);

      return res.status(500).send({"message": err});
    }
  })

  //delete
  .delete(async (req, res) => {
    const id = req.params.id;

    try{
      const prismaUsersRepository = new PrismaUsersRepository();

      const deleteUserController = new DeleteUserController(
        prismaUsersRepository
      );

      const userDeleted = await deleteUserController.handle({id});

      return res.status(200).send([userDeleted, {"message": "Usuário excluído com sucesso"}]);
    } catch(err){
      console.log(err);

      return res.status(500).send({"message": err});
    }
  });

//All Users 
routes.route('/user/all')
  .get(async (req, res) => {
    try{
      const prismaUsersRepository = new PrismaUsersRepository();
      const users = prismaUsersRepository.allUsers();

      return res.status(201).send((!users ? {"message": "Nenhum usuário encontrado"}: users));
    } catch(err){
      console.log(err);

      return res.status(500).send({"message": err});
    }
  });
*/
/***************
 *** COMPANY ***
 ***************/
//Company CREATE and UPDATE
routes.route('/company')
  //create
  .post(async (req, res) => {
    const {social_name, cnpj, email, owner} = req.body;
    try{
      const prismaCompaniesRepository = new PrismaCompaniesRepository();

      const createCompanyController = new CreateCompanyController(
        prismaCompaniesRepository
      );

      const companyCreated =  await createCompanyController.handle({
        social_name,
        cnpj,
        email,
        owner
      });

      return res.status(201).send([companyCreated, {"message": "Compania criada com sucesso"}]);
    } catch(err){
      console.log(err);

      return res.status(500).send({"message": err});
    }
  })

  //update
  .put(async (req, res) => {
    const {id, social_name, cnpj, email, status, owner} = req.body;

    try{
      const prismaCompaniesRepository = new PrismaCompaniesRepository();

      const updateCompanyController = new UpdateCompanyController(
        prismaCompaniesRepository
      );

      const companyUpdated = await updateCompanyController.handle({
        id,
        social_name,
        cnpj,
        email,
        status,
        owner
      });

      return res.status(200).send([companyUpdated, {"message": "Compania alterada com sucesso"}]);
    } catch(err){
      console.log(err);

      return res.status(500).send({"message": err});
    }
  })

//Company GET and DELETE by id
routes.route('/company/:id')
  .get(async (req, res) => {
    const id = req.params.id;

    try{
      const prismaCompaniesRepository = new PrismaCompaniesRepository();
      let company = null;

      if(id){
        company = await prismaCompaniesRepository.findById(id);
      }

      return res.status(201).send((!company ? {"message": "Nenhuma compania encontrada"}: company));
    } catch(err){
      console.log(err);

      return res.status(500).send({"message": err});
    }
  })
  
  //delete
  .delete(async (req, res) => {
    const id = req.params.id;

    try{
      const prismaCompaniesRepository = new PrismaCompaniesRepository();

      const deleteCompanyController = new DeleteCompanyController(
        prismaCompaniesRepository
      );

      const companyDeleted = await deleteCompanyController.handle({id});

      return res.status(200).send([companyDeleted, {"message": "Compania excluída com sucesso"}]);
    } catch(err){
      console.log(err);

      return res.status(500).send({"message": err});
    }
  });