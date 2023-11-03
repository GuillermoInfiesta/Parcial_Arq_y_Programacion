import mongoose from "npm:mongoose@7.6.3"

const Schema = mongoose.Schema;

const MonumentoSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigoPostal: {type: String, required: true},
    codigoIso: {type: String, required: true},
    ciudad: {type: String, required: true},
    pais: {type: String, required: true},
    continente: {type: String, required: true}
    
}/*, {timestamps: true}*/);

export type MonumentoModelType = {
    nombre: string,
    descripcion: string,
    codigoPostal: string,
    codigoIso: string
    ciudad: string,
    pais: string,
    continente: string,
    _id: mongoose.Types.ObjectId;
};

export const MonumentoModel = mongoose.model<MonumentoModelType>(
    "Monumentos",
    MonumentoSchema,
);
