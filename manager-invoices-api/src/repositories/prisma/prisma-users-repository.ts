import { prismaClient } from "../../database/prisma-client";
import { UserData, UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create({name, email, password, role, admin}: UserData) {
    await prismaClient.user.create({
      data:{
        name,
        email,
        password,
        role,
        admin
      }
    });
  }

  async update({id, name, email, password, role, admin}: UserData){
    await prismaClient.user.update({
      where: {id: id},
      data: {
        name: name, 
        email: email,
        password: password,
        role: role,
        admin: admin
      }
    });
  }

  async delete(user_id: string){
    await prismaClient.user.delete({
      where: {id: user_id}
    });
  }
}