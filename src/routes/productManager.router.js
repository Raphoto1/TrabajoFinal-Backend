import { Router } from "express";

const productManagerRouter = Router();

productManagerRouter.get("/", (req, res) =>{
    res.send("aqui estoy en router de products");
})

export default productManagerRouter();