import {Response, Request} from "npm:express@4.18.2";
import { checkIdLength } from '../verifiers/checkIdLenght.ts';
import { MonumentoModel } from '../collections/Monumento.ts';

export const updateMonumento = async(req: Request, res: Response) => {
    const id = req.params.id;

    try{
        checkIdLength(id);
    }catch(e){
        res.status(400).send(e.message)
    }
    try{
        const exists = await MonumentoModel.findOne().where("_id").equals(id).exec();
        if(!exists){
            res.status(404).send("No existe un monumento con ese id");
            return;
        }
        const filter = {
            _id: id
        }
        const changes ={
            
        }



    }catch(e){
        res.status(404).send(e.message)
    }
}