import {Response, Request} from "npm:express@4.18.2";
import { MonumentoModelType } from '../collections/Monumento.ts';
import { MonumentoModel } from '../collections/Monumento.ts';
import { getCiudad } from './getCiudad.ts';
import { getPais } from './getPais.ts';
import { getCountryData } from './getCountryData.ts';

export const postMonumento = async (req: Request, res: Response) => {
    //const body: Partial<Omit<MonumentoModelType,"_id">>= req.body;

    const {nombre, descripcion, codigoPostal, codigoIso} = req.body;
    
    if(!nombre || !descripcion || !codigoPostal || !codigoIso){
        res.status(500).send("Faltan datos");
        return;
    }

    try{
        const {nomPais, nomContinente} = await getCountryData(codigoIso);
    
        const exists = await MonumentoModel.findOne().where("nombre").equals(nombre).exec();
        if(exists&& (exists.codigoPostal === codigoPostal)){
            res.status(400).send("Ya existe un monumento con ese nombre en el mismo codigo postal");
            return;
        }
        
        const ciudad:string = await getCiudad(codigoPostal, codigoIso);
        await MonumentoModel.create({
            nombre,
            descripcion,
            codigoPostal,
            codigoIso,
            ciudad,
            pais: nomPais,
            continente: nomContinente
        })
        res.status(200).send("Monumento añadido")

    }catch(e){
        res.status(500).send(e.message);
        return;
    }
}