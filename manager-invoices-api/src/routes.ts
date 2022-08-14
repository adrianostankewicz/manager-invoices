import express from 'express';

export const routes = express.Router();

routes.post('/', async (req, res) => {
  
  try{
    
    
    return res.status(201).send();
  } catch(err){
    console.log(err);

    return res.status(500).send();
  }
});