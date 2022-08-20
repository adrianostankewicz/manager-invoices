import { Request, Response } from "express";
import { Company } from "src/model/company";
import { PrismaCompaniesRepository } from "src/repositories/prisma/prisma-companies-repository";
import { CompaniesService } from "src/services/companies-service";

export class CompanyController {

  /**
   * Save a new company
   * @param req 
   * @param res 
   * @returns 
   */
  async store(req: Request, res: Response){
    try {
      const company = new Company();
      company.social_name = req.body.social_name;
      company.cnpj = req.body.cpnj;
      company.email = req.body.email;
      company.status = req.body.status;
      company.owner = req.body.owner;

      let companiesService = new CompaniesService();
      const companyCreated = await companiesService.save(company);

      if(!companyCreated){
        return res.status(404).send({'message': 'Could not create a new company. Please, try again in few minutes'});
      }

      return res.status(201).send(companyCreated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not create a new company. ' + error});
    }
  }

  /**
   * Edit a exist company
   * @param req 
   * @param res 
   * @returns 
   */
  async edit(req: Request, res: Response){
    try {
      const company = new Company();
      company.id = req.body.id;
      company.social_name = req.body.social_name;
      company.cnpj = req.body.cpnj;
      company.email = req.body.email;
      company.status = req.body.status;
      company.owner = req.body.owner;
      
      let companiesService = new CompaniesService();
      const companyUpdated = await companiesService.update(company);

      return res.status(200).send(companyUpdated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not update the company. ' + error});
    }
  }

  /**
   * Delete a exist company by id
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
      let companiesService = new CompaniesService();
      const deletedCompany = await companiesService.delete(id);

      return res.status(200).send(deletedCompany);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not delete the company. ' + error});
    }
  }

  /**
   * Get a company by id
   * @param req 
   * @param res 
   * @returns 
   */
  async show(req: Request, res: Response){
    let companiesRepository = new PrismaCompaniesRepository();
    const company = await companiesRepository.findById(req.params.id);
    return res.status(200).send(company);
  }
}