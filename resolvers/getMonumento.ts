import {Response, Request} from "npm:express@4.18.2";
import { checkIdLength } from '../verifiers/checkIdLenght.ts';
import { MonumentoModel } from '../collections/Monumento.ts';
import { getHora } from './getHora.ts';
import { getTemporal } from './getTemporal.ts';
import { getCapital } from './getCapital.ts';

export const getMonumento = async (req:Request, res:Response) => {
    const id = req.params.id;
    try{
        checkIdLength(id);
    }catch(e){
        res.status(400).send(e.message)
    }

    try{
        const monumento = await MonumentoModel.findOne().where("_id").equals(id).exec();
        if(!monumento){
            res.status(404).send("No se ecnuentra un monumento con ese id");
            return;
        }
        const capital = await getCapital(monumento.codigoIso);

        const hora = await getHora(monumento.continente, capital);
        const temporal = await getTemporal(capital);

        res.status(200).send({
            monumento,
            hora,
            temporal,
        })
    }catch(e){
        res.status(400).send(e.message)
    }

}