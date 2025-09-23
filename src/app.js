import express from 'express'
import cors from "cors";
 
import Roteamento from './routes/routes.js';
const api = express();

api.use(cors());
api.use(express.json()); 



Roteamento(api)

api.listen(5011, () => console.log('API subiu com sucesso!'));