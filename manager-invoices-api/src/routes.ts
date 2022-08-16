import { CreateUserController } from '@controllers/create-user-controller';
import express from 'express';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';

export const routes = express.Router();

/************
 *** USER ***
 ************/
routes.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  try{
    const prismaUsersRepository = new PrismaUsersRepository();

    const createUserController = new CreateUserController(
      prismaUsersRepository
    );

    await createUserController.handle({
      name,
      email,
      password
    });

    return res.status(201).send({"message": "Usuário criado com sucesso"});
  } catch(err){
    console.log(err);

    return res.status(500).send();
  }
});