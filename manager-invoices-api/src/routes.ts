import express from 'express';

export const routes = express.Router();

routes.post('/user', async (req, res) => {
  const {name, email, password, role, admin} = req.body;
  console.log("teste");
  try{
    return res.status(201).send(req.body);
  } catch(err){
    console.log(err);

    return res.status(500).send();
  }
});