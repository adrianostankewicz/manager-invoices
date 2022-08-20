import { prismaClient } from "src/database/prisma-client";
import { Category } from "src/model/category";
import { CategoriesRepository } from "../categories-repository";


export class PrismaCategoriesRepository implements CategoriesRepository {

  async create({name, description, status}: Category) {
    const categoryCreated = await prismaClient.category.create({
      data:{
        name,
        description,
        status
      }
    });

    return categoryCreated;
  }

  async update({id, name, description, status}: Category){
    const categoryUpdated = await prismaClient.category.update({
      where: {id: id},
      data: {
        name: name,
        description: description, 
        status: status
      }
    });

    return categoryUpdated;
  }

  async delete(category_id: string){
    const categoryDeleted = await prismaClient.category.delete({
      where: {id: category_id}
    });

    return categoryDeleted;
  }

  async findById(category_id: string){
    const category = await prismaClient.category.findFirst({
      where: {id: category_id}
    });

    return category;
  }

  async findByName(name: string){
    const category = await prismaClient.category.findFirst({
      where: {name: name}
    });

    return category;
  }

  async findByStatus(status: string){
    const category = await prismaClient.category.findFirst({
      where: {status: status}
    });

    return category;
  }

  async allCategories(){
    return await prismaClient.category.findMany();
  }
}