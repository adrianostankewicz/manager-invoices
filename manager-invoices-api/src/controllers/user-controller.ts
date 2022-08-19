import { Request, Response } from "express";
import { User } from "src/model/user";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "src/repositories/users-repository";
import { UsersServices } from "src/services/users-service";

export class UserController {
  
  private usersRepository: UsersRepository;
  private usersService: UsersServices;

  constructor(){
    this.usersRepository = new PrismaUsersRepository();
    this.usersService = new UsersServices();
  }

  async store(req: Request, res: Response){
    try {
      
      const user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.cellphone = req.body.cellphone;
      user.password = req.body.password;
      user.role = req.body.role;
      user.admin = req.body.admin;

      const userCreated = await this.usersService.save(user);

      if(!userCreated){
        return res.status(404).send({'message': 'Could not create a new user. Please, try again in few minutes'});
      }

      return res.status(201).send(userCreated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not create a new user. ' + error});
    }
  }

  async edit(req: Request, res: Response){
    try {
      const user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.cellphone = req.body.cellphone;
      user.password = req.body.password;
      user.role = req.body.role;
      
      const userUpdated = await this.usersRepository.update(user);

      return res.status(200).send(userUpdated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not update the user. ' + error});
    }
  }

  async destroy(req: Request, res: Response){
    const id = req.body.id;

    if(!id){
      res.status(400).send('Id is required');
    }
    
    try {
      const deletedUser = await this.usersRepository.delete(id);

      return res.status(200).send(deletedUser);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not delete the user. ' + error});
    }
  }
  
  async show(req: Request, res: Response){
    const user = await this.usersRepository.findById(req.body.id);
    return res.status(200).send(user);
  }
}