import {Response, Request} from "npm:express@4.18.2";
import { MonumentoModel } from '../collections/Monumento.ts';

export const getAllMonumentos = async(req:Request, res:Response) => {
    
    
    const monumentos = await MonumentoModel.find({}).exec();

    const datosMonumentos = monumentos.map((x) => {
        return {
            id: x._id,
            nombre: x.nombre,
            pais: x.pais,
        }
    })

    res.status(200).send(datosMonumentos);
    

}