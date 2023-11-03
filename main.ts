import express from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { deleteMonumento } from './resolvers/deleteMonumento.ts';
import { getAllMonumentos } from './resolvers/getAllMonumentos.ts';
import { getMonumento } from './resolvers/getMonumento.ts';
import { postMonumento } from './resolvers/postMonumento.ts';
import { updateMonumento } from './resolvers/updateMonumento.ts';

const env = await load();

try{
  console.log(env.MONGO_URL);
  await mongoose.connect(env.MONGO_URL || Deno.env.get("MONGO_URL") || "");
}catch(e){ 
  console.log(e);
  //Deno.exit(1);
}
console.log("Conexión establecida"); 

const miapp = express();

miapp.use(express.json());

miapp
  .get("/api/monumentos", getAllMonumentos)
  .get("/api/monumentos/:id", getMonumento)
  .post("/api/monumentos", postMonumento)
  .put("/api/monumentos/:id", updateMonumento)
  .delete("/api/monumentos/:id", deleteMonumento);


try{
  miapp.listen(env.PORT || Deno.env.get("PORT"));
}catch(e){
  console.log(e)
  //Deno.exit(1);
}