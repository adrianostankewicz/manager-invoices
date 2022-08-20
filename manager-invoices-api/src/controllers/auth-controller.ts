import { Request, Response } from "express";
import { User } from "src/model/user";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UsersService } from "src/services/users-service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "src/config/auth.json";

export class AuthController {

  async register(req: Request, res: Response){
    try{
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

      const token = await jwt.sign({id: userCreated.id}, authConfig.secret, {
        expiresIn: 86400,
      });

      return res.status(201).send({
        userCreated,
        token: token
      });

    } catch (error) {
      return res.status(400).send({'message' : 'Could not create a new user. ' + error});
    }
  }

  async login(req: Request, res: Response){
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;

    let usersRepository = new PrismaUsersRepository();
    const userLogin = await usersRepository.findByEmail(user.email);

    if(!userLogin){
      return res.status(400).send({'message' : 'User not found'});
    }

    if(!await bcrypt.compare(user.password, userLogin.password)){
      return res.status(400).send({'message' : 'User password invalid'});
    }

    userLogin.password = undefined;

    const token = await jwt.sign({id: userLogin.id}, authConfig.secret, {
      expiresIn: 86400,
    });

    return res.status(200).send({
      userLogin, 
      token: token
    });
  }
}  