import express from "express";
import { create, update, destroy } from "./data/fs/products.js";

const app = express();

//configurar puerto
const port = 8080;
const ready = console.log("server ready on port" + port);

app.listen(port,ready);

//para configurar solicitudes/peticiones
app.get("/", (req, res) => {
    try{
      const product = "Welcome to coder-products"
      return res.json({status: 200, response: product})
    }catch(error){
      console.log(error);
      return res.json({status: 500, response: "error"})
    }
})

app.get("/products", read)

async function read(req, res){
    try{
      const all = await read();
      return res.json({status: 200, response: all})
    }catch(error){
     console.log(error);
     return res.json({status: 500, response: error.products})
    }
}