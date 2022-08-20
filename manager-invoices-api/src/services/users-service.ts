import { User } from "src/model/user";
import { PrismaUsersRepository } from "src/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "src/repositories/users-repository";
import bcrypt from "bcryptjs";

export class UsersService {

  private usersRepository: UsersRepository;
  
  constructor(){
    this.usersRepository = new PrismaUsersRepository();
  }

  async save(user: User){
    
    if(!user.name){
      throw new Error('Name is required');
    }

    if(!user.email){
      throw new Error('Email is required');
    }

    if(!user.password){
      throw new Error('Password is required');
    }

    if(!user.cellphone){
      throw new Error('Cellphone is required');
    }

    if(await this.usersRepository.findByEmail(user.email)){
      throw new Error('User already exist');
    }

    user.password = await bcrypt.hash(user.password, 10);
    const userCreated = await this.usersRepository.create(user);

    userCreated.password = undefined;

    return userCreated;
  }
  
  async update(user: User){

    const userUpdate = await this.usersRepository.findById(user.id);

    if(!userUpdate){
      throw new Error('User do not exist');
    }

    if(user.email !== userUpdate.email){
      throw new Error('Field email do not to updatable');
    }

    if(user.password){
      user.password = await bcrypt.hash(user.password, 10);
    }

    const userUpdated = await this.usersRepository.update(user);
    userUpdated.password = undefined;

    return userUpdated;
  }

  async delete(id: string){
    const userDrop = await this.usersRepository.findById(id);

    if(!userDrop){
      throw new Error('User do not exist');
    }

    const userDeleted = await this.usersRepository.delete(id);

    return userDeleted;
  }
}