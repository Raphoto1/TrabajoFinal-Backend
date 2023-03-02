import express from "express";
import productManagerRouter from "../routes/productManager.router.js";
import cartManagerRouter from "../routes/cartManager.router.js"
import __dirname from "./utils.js";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "../../public"));

//products route
app.use("/api/products", productManagerRouter);
//cart route
app.use("/api/cart", cartManagerRouter)
//escucha
app.listen(8080, () => {
console.log("listening 8080");
})