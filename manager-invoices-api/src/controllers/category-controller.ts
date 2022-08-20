import { Request, Response } from "express";
import { Category } from "src/model/category";
import { PrismaCategoriesRepository } from "src/repositories/prisma/prisma-categories-repository";
import { CategoriesService } from "src/services/categories-service";

export class CategoryController {

  /**
   * Save a new category
   * @param req 
   * @param res 
   * @returns 
   */
   async store(req: Request, res: Response){
    try {
      const category = new Category();
      category.name = req.body.name;
      category.description = req.body.description;
      category.status = req.body.status;

      let categoriesService = new CategoriesService();
      const categoryCreated = await categoriesService.save(category);

      if(!categoryCreated){
        return res.status(404).send({'message': 'Could not create a new category. Please, try again in few minutes'});
      }

      return res.status(201).send(categoryCreated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not create a new category. ' + error});
    }
  }

  /**
   * Edit a exist category
   * @param req 
   * @param res 
   * @returns 
   */
  async edit(req: Request, res: Response){
    try {
      
      const category = new Category();
      category.name = req.body.name;
      category.description = req.body.description;
      category.status = req.body.status;

      let categoriesService = new CategoriesService();
      const categoryUpdated = await categoriesService.update(category);

      return res.status(200).send(categoryUpdated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not update the category. ' + error});
    }
  }

  /**
   * Delete a exist category by id
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
      let categoriesService = new CategoriesService();
      const categoryDeleted = await categoriesService.delete(id);

      return res.status(200).send(categoryDeleted);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not delete the category. ' + error});
    }
  }

  /**
   * Get a company by id
   * @param req 
   * @param res 
   * @returns 
   */
  async show(req: Request, res: Response){
    let categoriesRepository = new PrismaCategoriesRepository();
    const category = await categoriesRepository.findById(req.params.id);
    return res.status(200).send(category);
  }
}