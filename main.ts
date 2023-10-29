import express from "npm:express@4.18.2"
import mongoose from "npm:mongoose@7.6.3"
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();

try{
  console.log(env.MONGO_URL);
  await mongoose.connect(env.MONGO_URL || Deno.env.get("MONGO_URL") || "");
}catch(e){ 
  console.log(e);
  Deno.exit(1);
}
console.log("Conexión establecida"); 

const miapp = express();

miapp.use(express.json());



try{
  miapp.listen(env.PORT);
}catch(e){
  console.log(e)
  Deno.exit(1);
}