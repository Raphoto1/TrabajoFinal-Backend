import { Router, json } from "express";
import CartManager from "../app/cartManager.js";

const cartManagerRouter = Router();
const cart = new CartManager();

cartManagerRouter.get("/", async (req, res) => {
    const prodsInCart = await cart.getCarts();
    await res.send(prodsInCart);
})

cartManagerRouter.get("/:cId", async (req,res) =>{
    const prodId = await Number(req.params.cId);
    const result = await cart.getCarts(prodId)
})

cartManagerRouter.post("/", async (req,res) =>{
 const newCart = await cart.createCart();
 await res.send(newCart);
})

cartManagerRouter.post("/:cId/product/:pId", async (req,res) =>{
    const cartId = await Number(req.params.cId);
    const prodId = await Number(req.params.pId);
    const result = await cart.addProductToCart(cartId, prodId);
    await res.send(result);
})

export default cartManagerRouter;
