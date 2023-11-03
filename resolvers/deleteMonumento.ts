import {Response, Request} from "npm:express@4.18.2";
import { checkIdLength } from '../verifiers/checkIdLenght.ts';
import { MonumentoModel } from '../collections/Monumento.ts';

export const deleteMonumento = async (req: Request, res: Response) => {
    const id = req.params.id;

    try{
        checkIdLength(id);
    }catch(e){
        res.status(400).send(e.message);
        return;
    }

    const deleted = await MonumentoModel.deleteOne().where("_id").equals(id).exec();

    if(deleted.deletedCount === 0){
        res.status(404).send("Monumento no encontrado");
        return;
    }
    res.status(200).send("Monumento eliminado");
}