import fs from "fs";
import crypto from "crypto";

//creamos el constructor con el array vacio.
let products = [];
let pathFile = "./data/fs/products.js";

//creamos metodo addProducts para agregar productos al arreglo inicial
const addProduct = async(title, description, price, thumbail, code, stock) => {

const newProduct = {
    id: products.length + 1,
    title,
    description,
    price, 
    thumbail,
    code,
    stock
};

if(Object.values(newProduct).includes(undefined)){
   console.log("Todos los campos son obligatorios");
}

//validamos que no se repita el campo code
const productExists = products.find(product => product.code === code);
if (productExists){
    console.log('El producto con el codigo ${code} ya existe');
    return;
}

products.push(newProduct);

await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

const getProducts = async () => {
    const productsJson = await fs.promises.readFile(pathFile, "utf8")
    products = JSON.parse(productsJson) || [];
    return products;
};

const getProductById = async (id) => {
    await getProducts();
     const product = products.find ((product) => product.id === id);
    if (!product) {
        console.log ("No se encontro el producto con el ID ${id}");
        return;
    }

    console.log(product);
    return product;
};

//Actualizar un producto
const updateProduct = async (id, dataProduct) => {
    await getProducts();
    const index = products.findIndex(product => product.id === id);
    products[index] = {
        ...products[index],
        ...dataProduct
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}
//hacemos el test del ingreso de los productos
// addProduct("Producto 1", "El primer producto", 299, "http://www.google.com", "ASDF121", 10);
// addProduct("Producto 2", "El segundo producto", 899, "http://www.google.com", "ASDF122", 10);
// addProduct("Producto 3", "El tercer producto", 899, "http://www.google.com", "ASDF122", 10);
// addProduct("Producto 4", "El cuarto producto", 899, "http://www.google.com", "ASDF123", 10);
// addProduct("Producto 5", "El quinto producto", 899, "http://www.google.com", "ASDF124", 10);

 //getProducts();

 //export notesManager = new NotesManager();
 //export default notesManager;
export {read, create, update, destroy};