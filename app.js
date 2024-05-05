import express from "express";
import productManager from "./data/fs/productManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) =>{

    try{
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);

    res.status(200).json(products);
    
    } catch (error) {
    console.log(error);
    }
});

//para configurar solicitudes/peticiones
app.get("/products/:pid", async (req, res) => {
    try{
        const { pid } = req.params;

        const product = await productManager.getProductById(parseInt(pid));

        res.status(200).json(product);

    }catch (error) {
        console.log(error);
    }
});

//configurar puerto
app.listen(8080, () => {
    console.log('server ready on port 8080');
});


