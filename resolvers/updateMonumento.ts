import {Response, Request} from "npm:express@4.18.2";
import { checkIdLength } from '../verifiers/checkIdLenght.ts';
import { MonumentoModel } from '../collections/Monumento.ts';
import { getCountryData } from './getCountryData.ts';
import { getCiudad } from './getCiudad.ts';

export const updateMonumento = async(req: Request, res: Response) => {
    const id = req.params.id;
    const {nombre, descripcion, codigoPostal, codigoIso} = req.body;

    if(!nombre || !descripcion || !codigoPostal || !codigoIso){
        res.status(500).send("Faltan datos");
        return;
    }

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
        const {nomPais, nomContinente} = await getCountryData(codigoIso);
        const ciudad:string = await getCiudad(codigoPostal, codigoIso);


        const filter = {
            _id: id
        }
        const changes ={
            nombre: nombre,
            descripcion: descripcion,
            codigoPostal: codigoPostal,
            codigoIso: codigoIso,
            ciudad: ciudad,
            pais: nomPais,
            continente: nomContinente
        }
        await MonumentoModel.findOneAndUpdate(filter,changes).exec()

        res.status(200).send("Monumento actualizado")
    }catch(e){
        res.status(400).send(e.message)
    }
}