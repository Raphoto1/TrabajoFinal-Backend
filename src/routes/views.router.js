import { Router, json } from "express";
import {CartManager, ProductManager} from "../dao/index.js";
import productModel from "../dao/models/products.model.js";
import cartModel from "../dao/models/carts.model.js";
import mongoose from "mongoose";

const item = new ProductManager();
const cart = new CartManager();

const viewer = Router();

viewer.get("/", async (req,res) =>{
    
    const prods = await productModel.paginate();
    console.log(prods);
    res.render("index", {prods});
})
//todos los productos
viewer.get("/products", async (req,res) =>{
    const {page} =req.query;
    const prods = await  productModel.paginate(
        {},{limit: 10, lean:true, page: page??1}
    );
    console.log(prods.docs);
    res.render("products", {prods});
})
//info del producto preciso
viewer.get("/products/productDetail", async (req,res) =>{
    const {pId} = req.query;
    console.log(pId);
    const detailData = await item.getProductById(pId);
    console.log(detailData);
    res.render("productDetail", {detailData})
})
//info carrito
viewer.get("/cart/:cId", async(req,res) => {
    const {cId} = req.params;
    const detailCart = await cart.getCarts(cId);
    console.log(detailCart);
    res.render("cart", {detailCart});
})




viewer.get('/real-time-products', (req, res) => {
    res.render('real_time_products');
});

viewer.get(`/chat`, (req,res) => {
    res.render(`chat`);
})


export default viewer;