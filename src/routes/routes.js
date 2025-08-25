import visitantesController from '../controller/visitantesController.js'
import admController from '../controller/admController.js'


export default function Roteamento(server){
    server.use(visitantesController)
    server.use(admController)
}