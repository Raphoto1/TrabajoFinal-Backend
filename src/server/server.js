import express from "express";
import productManagerRouter from "../routes/productManager.router.js";
import cartManagerRouter from "../routes/cartManager.router.js"
import __dirname from "./utils.js";
import { engine} from "express-handlebars";
import { Server } from "socket.io";
import viewer from "../routes/views.router.js";

const app = express();
// app.use(urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + "/../views");

app.use(express.json());
app.use(express.static(__dirname + "../../public"));
//viewer route
app.use("/", viewer);

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

//get products by id
// localhost:8080/api/products/2

//update data products
// localhost:8080/api/products/update?prodIdUp=9&value=title&data=rafa

//add product
// localhost:8080/api/products/add?title=carro&description=bla bla bla&price=2000&thumbnail=[{./img/img1.jpg},{./img/img2.jpg}]&stock=5&status=true&category=autos&code=4

//delete product
// localhost:8080/api/products/delete/1

//get carts
// localhost:8080/api/cart/

//add product to cart
// localhost:8080/api/cart/5/product/3

//Crear carrito
// localhost:8080/api/cart/