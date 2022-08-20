import { Request, Response } from "express";
import { User } from "src/model/user";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UsersService } from "src/services/users-service";

export class UserController {
  
  /**
   * Create a new user
   * @param req 
   * @param res 
   * @returns 
   */
  async store(req: Request, res: Response){
    try {
      const user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.cellphone = req.body.cellphone;
      user.password = req.body.password;
      user.role = req.body.role;
      user.admin = req.body.admin;

      let usersService = new UsersService();
      const userCreated = await usersService.save(user);

      if(!userCreated){
        return res.status(404).send({'message': 'Could not create a new user. Please, try again in few minutes'});
      }

      return res.status(201).send(userCreated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not create a new user. ' + error});
    }
  }

  /**
   * Edit a exist user
   * @param req 
   * @param res 
   * @returns 
   */
  async edit(req: Request, res: Response){
    try {
      const user = new User();
      user.id = req.body.id;
      user.name = req.body.name;
      user.email = req.body.email;
      user.cellphone = req.body.cellphone;
      user.password = req.body.password;
      user.role = req.body.role;
      
      let usersService = new UsersService();
      const userUpdated = await usersService.update(user);

      return res.status(200).send(userUpdated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not update the user. ' + error});
    }
  }

  /**
   * Delete a user by id
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
      let usersService = new UsersService();
      const deletedUser = await usersService.delete(id);

      return res.status(200).send(deletedUser);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not delete the user. ' + error});
    }
  }
  
  /**
   * Get a user by id
   * @param req 
   * @param res 
   * @returns 
   */
  async show(req: Request, res: Response){
    let usersRepository = new PrismaUsersRepository();
    const user = await usersRepository.findById(req.params.id);
    return res.status(200).send(user);
  }
}