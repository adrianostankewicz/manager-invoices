import { Category } from "src/model/category";
import { CategoriesRepository } from "src/repositories/categories-repository";
import { PrismaCategoriesRepository } from "src/repositories/prisma/prisma-categories-repository";

export class CategoriesService {

  private categoriesRepository: CategoriesRepository;

  constructor(){
    this.categoriesRepository = new PrismaCategoriesRepository();
  }

  async save(category: Category){

    if(!category.name){
      throw new Error('Name is required');
    }

    if(!category.status){
      throw new Error('Status is required');
    }

    if(await this.categoriesRepository.findByName(category.name)){
      throw new Error('Category already exist');
    }

    const categoryCreated = await this.categoriesRepository.create(category);
    return categoryCreated;
  }

  async update(category: Category){
    const categoryUpdate = await this.categoriesRepository.findById(category.id);

    if(!categoryUpdate){
      throw new Error('Category do not exist');
    }

    const categoryUpdated = await this.categoriesRepository.update(category);

    return categoryUpdated;
  }
  
  async delete(id: string){
    const categoryDrop = await this.categoriesRepository.findById(id);

    if(!categoryDrop){
      throw new Error('Category do not exist');
    }

    const categoryDeleted = await this.categoriesRepository.delete(id);

    return categoryDeleted;
  }
}