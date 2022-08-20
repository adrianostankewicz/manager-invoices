import { Request, Response } from "express";
import { CompanyPreferences } from "src/model/company-preferences";
import { PrismaCompanyPreferencesRepository } from "src/repositories/prisma/prisma-company-preferences-repository";
import { CompanyPreferencesService } from "src/services/company-preferences-service";

export class CompanyPreferencesController {

  /**
   * Save a new company preferences
   * @param req 
   * @param res 
   * @returns 
   */
   async store(req: Request, res: Response){
    try {
      const companyPreferences = new CompanyPreferences();
      companyPreferences.billing_threshold = req.body.billing_threshold;
      companyPreferences.notifications_email = req.body.notifications_email;
      companyPreferences.notifications_sms = req.body.notifications_sms;
      

      let companyPreferencesService = new CompanyPreferencesService();
      const companyPreferencesCreated = await companyPreferencesService.save(companyPreferences);

      if(!companyPreferencesCreated){
        return res.status(404).send({'message': 'Could not create a new company preferences. Please, try again in few minutes'});
      }

      return res.status(201).send(companyPreferencesService);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not create a new company preferences. ' + error});
    }
  }

  /**
   * Edit a exist company preferences
   * @param req 
   * @param res 
   * @returns 
   */
  async edit(req: Request, res: Response){
    try {
      const companyPreferences = new CompanyPreferences();
      companyPreferences.id = req.body.id;
      companyPreferences.billing_threshold = req.body.billing_threshold;
      companyPreferences.notifications_email = req.body.notifications_email;
      companyPreferences.notifications_sms = req.body.notifications_sms;
      
      let companyPreferencesService = new CompanyPreferencesService();
      const companyPreferencesUpdated = await companyPreferencesService.update(companyPreferences);

      return res.status(200).send(companyPreferencesUpdated);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not update the company preferences. ' + error});
    }
  }

  /**
   * Delete a exist company preferences by id
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
      let companyPreferencesService = new CompanyPreferencesService();
      const companyPreferencesDeleted = await companyPreferencesService.delete(id);

      return res.status(200).send(companyPreferencesDeleted);

    } catch (error) {
      return res.status(400).send({'message' : 'Could not delete the company preferences. ' + error});
    }
  }

  /**
   * Get a company preferences by id
   * @param req 
   * @param res 
   * @returns 
   */
  async show(req: Request, res: Response){
    let companyPreferencesRepository = new PrismaCompanyPreferencesRepository();
    const companyPreferences = await companyPreferencesRepository.findById(req.params.id);
    return res.status(200).send(companyPreferences);
  }
}