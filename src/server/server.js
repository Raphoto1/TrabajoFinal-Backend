import express, {urlencoded} from "express";
import productManagerRouter from "../routes/productManager.router.js";
import cartManagerRouter from "../routes/cartManager.router.js"
import __dirname from "./utils.js";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "../../public"));
app.use(urlencoded({ extended: true }));
//products route
app.use("/api/products", productManagerRouter);
//cart route
app.use("/api/cart", cartManagerRouter)
//escucha
app.listen(8080, () => {
console.log("listening 8080");
})

//get products
// localhost:8080/api/products

//get products limit
//localhost:8080/api/products?limit=2

//get products by id
// localhost:8080/api/products/2

//put update data products
// localhost:8080/api/products/?prodIdUp=3&value=carro&data=rafa

//post add product
// localhost:8080/api/products/?title=carro&description=bla bla bla&price=2000&thumbnail=[{./img/img1.jpg},{./img/img2.jpg}]&stock=5&status=true&category=autos&code=9

//del delete product
// localhost:8080/api/products/3

//post Crear carrito
// localhost:8080/api/cart/

//get carts
// localhost:8080/api/cart/

//getcarts By id
//localhost:8080/api/cart/2

//post add product to cart
// localhost:8080/api/cart/1/product/2
