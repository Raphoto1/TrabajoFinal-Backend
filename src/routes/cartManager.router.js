import { Router, json } from "express";
import {CartManager} from "../dao/index.js";

const cartManagerRouter = Router();
const cart = new CartManager();
//agregar carrito
cartManagerRouter.post("/", async (req,res) =>{
    await cart.createCart();
    const result = await cart.getCarts();
    await res.send(result);
}) 
//revisar carritos
cartManagerRouter.get("/", async (req, res) => {
    const{cId} = req.params;
    const carts = await cart.getCarts(cId);
    console.log(carts);
    await res.send(carts);
})
//revisar carrito por id
cartManagerRouter.get("/:cId", async (req, res) => {
    const{cId} = req.params;
    const carts = await cart.getCarts(cId);
    console.log(carts);
    res.send(carts);
})
//eliminar producto del carrito
cartManagerRouter.delete("/:cId/products/:pId", async (req,res) => {
    const{cId} = req.params;
    const {pId} = req.params;
    const prodToDel = await cart.deleteProd(cId,pId);
    res.send(prodToDel);
})

//agregar UN producto al carrito
cartManagerRouter.post("/:cId/product/:pId", async (req,res) =>{
    const cartId = await req.params.cId;
    const prodId = await req.params.pId;
    const prodQuanty = req.body.pQ;
    const result = await cart.addProductToCart(cartId, prodId, prodQuanty);
    await res.send(result);
})



export default cartManagerRouter;
