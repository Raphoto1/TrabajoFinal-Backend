import { Router, json } from "express";
import CartManager from "../app/cartManager.js";

const cartManagerRouter = Router();
const cart = new CartManager();

cartManagerRouter.post("/", async (req, res) => {
  try {
    await cart.createCart();
    const result = await cart.getCarts();
    res.send(result);
  } catch (error) {}
});

cartManagerRouter.get("/", async (req, res) => {
  try {
    
   const carts = await cart.getCarts();
   res.send(carts);
  console.log(carts);
    
  } catch (err) {
    res.status(404).send({error: `${err}`})
  }
});

cartManagerRouter.get("/:cId", async (req, res) => {
  try {
    const { cId } = req.params;
    console.log(cId);
   const carts = await cart.getCarts(cId);
   res.send(carts);
  console.log(carts);
    
  } catch (err) {
    res.status(404).send({error: `${err}`})
  }
});

cartManagerRouter.post("/:cId/product/:pId", async (req, res) => {
  try {
    const cartId = Number(req.params.cId);
    const prodId = Number(req.params.pId);
    const result = await cart.addProductToCart(cartId, prodId);
    res.send(result);
  } catch (err) {
    res.status(404).send({error: `${err}`})
  }
});

export default cartManagerRouter;
