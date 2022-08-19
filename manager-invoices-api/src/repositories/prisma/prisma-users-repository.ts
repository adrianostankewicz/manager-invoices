import { User } from "src/model/user";
import { prismaClient } from "../../database/prisma-client";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create({name, email, cellphone, password, role, admin}: User) {
    const userCreated = await prismaClient.user.create({
      data:{
        name,
        email,
        cellphone,
        password,
        role,
        admin
      }
    });

    return userCreated;
  }

  async update({id, name, email, cellphone, password, role, admin}: User){
    const userUpdated = await prismaClient.user.update({
      where: {id: id},
      data: {
        name: name, 
        email: email,
        cellphone: cellphone,
        password: password,
        role: role,
        admin: admin
      }
    });

    return userUpdated;
  }

  async delete(user_id: string){
    const userDeleted = await prismaClient.user.delete({
      where: {id: user_id}
    });

    return userDeleted;
  }

  async findById(user_id: string){
    const user = await prismaClient.user.findFirst({
      where: {id: user_id}
    });

    return user;
  }

  async findByEmail(email: string){
    const user = await prismaClient.user.findFirst({
      where: {email: email}
    });

    return user;
  }

  async allUsers(){
    return await prismaClient.user.findMany();
  }
}