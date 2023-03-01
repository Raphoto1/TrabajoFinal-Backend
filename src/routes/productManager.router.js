import { Router, json } from "express";
import ProductManager from "../app/productManager.js";

const productManagerRouter = Router();
productManagerRouter.use(json());
const item = new ProductManager();


productManagerRouter.get("/", async (req,res) => {
    const {limit} = req.query;
    const prods = await item.getProducts(); 
    if(!limit){
       await res.send(prods);
    }else{
        //envia el filtrado de el numero de datos
    const filtered = prods.splice(0,limit);
    await res.send(filtered);
    }
    
});

//segun el id
productManagerRouter.get("/:id", async (req,res) => {
    const prodId = await Number(req.params.id);
    const log = console.log(prodId);
    const result = await item.getProductById(prodId);
    await res.send(result);
})

//post carga de info

productManagerRouter.post("/update", async (req,res) => {
    const prodIdUp = await Number(req.query.prodIdUp);
    const value = await req.query.value;
    const data = await req.query.data;
    // const result = prodIdUp + value + data;
    const result = await item.updateProdById(prodIdUp,value,data);
    await res.send(result);
})

export default productManagerRouter;