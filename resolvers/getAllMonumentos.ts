import {Response, Request} from "npm:express@4.18.2";
import { MonumentoModel } from '../collections/Monumento.ts';

export const getAllMonumentos = async(req:Request, res:Response) => {
    
    
    const monumentos = await MonumentoModel.find({}).exec();

    res.status(200).send(monumentos);
    

}