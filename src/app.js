import express from 'express'
import Roteamento from './routes/routes.js';
const api = express();
api.use(express.json()); 

Roteamento(api)

api.listen(5011, () => console.log('API subiu com sucesso!'));