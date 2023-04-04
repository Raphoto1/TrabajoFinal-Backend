import { Router, json } from "express";
import {ProductManager} from "../dao/index.js";
import productModel from "../dao/models/products.model.js";
import mongoose from "mongoose";


const item = new ProductManager();

const viewer = Router();

viewer.get("/", async (req,res) =>{
    
    const prods = await productModel.paginate();
    console.log(prods);
    res.render("index", {prods});
})

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

viewer.get('/real-time-products', (req, res) => {
    res.render('real_time_products');
});

viewer.get(`/chat`, (req,res) => {
    res.render(`chat`);
})


export default viewer;