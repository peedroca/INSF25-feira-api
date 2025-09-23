import visitantesController from '../controller/visitantesController.js'
import VincularController from '../controller/VincularController.js'


export default function Roteamento(server){
    server.use(visitantesController)
    server.use(VincularController)
}