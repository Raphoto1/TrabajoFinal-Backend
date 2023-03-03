import fs from "fs";
import ProductManager from "./productManager.js";

const item = new ProductManager();

class CartManager {
  #path = "./src/server/carts.json";
  idAcum = 0;

  constructor(path) {
    path = this.#path;
  }
//creamos carrito
async createCart(){
  let carts = await this.getCarts();
  const newCart = {
    cId: await this.idOrganizer(),
    products: [],
  };
  carts = [...carts, newCart];
await fs.promises.writeFile(this.#path, JSON.stringify(carts));
}

  async idOrganizer() {
    const carts = await this.getCarts();
    let chkCartNum = await carts.map((cart) => cart.cId);
    let highId = await Math.max(...chkCartNum);
    if (highId === -Infinity) {
      return 1;
    } else {
      console.log("pasa por adicion");
      return highId + 1;
    }
  }

  async getCarts() {
    try {
      const prodsInCart = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(prodsInCart);
    } catch (error) {
      return [];
    }
  }

  async chkCartById(arr, cId) {
    const chkCartId = await arr.some((cart) => cart.cId === cId);
    return chkCartId;
  }

  async cartOrganizer() {
    let carts = await this.getCarts();
    //agregar un if si no existe nada para inicializar
    if (carts === []) {
      const newCart = {
        cId: 1,
        products: [],
      };
      carts = [...carts, newCart];
    await fs.promises.writeFile(this.#path, JSON.stringify(carts));
    } else {
      const highId = await this.idOrganizer();
      const newCart = {
        cId: highId,
        products: [],
      };
      carts = [...carts, newCart];
      await fs.promises.writeFile(this.#path, JSON.stringify(carts));  
    }
  }

  async addProductToCart(cId, pId){

  }

//   async addProductToCart(cId, pId) {
//     const carts = await this.getCarts();
//     const chkCart = await this.chkCartById(carts, cId);
//     if (!chkCart) {
//       await this.cartOrganizer();
//       let newCart = await this.getCarts();
//       const findProduct = newCart.find((cart) => (card.cId = cId))
//       // const findProduct = await newCart.findIndex((cart) => (cart.cId = 1));
//       // if (findProduct) {
//       //   newCart[findProduct].products = {
//       //       id: pId,
//       //       quantity: 1,
//       //     };
//       // }
//       console.log(findProduct);
// cartsUpdated = [...newCart]
       
//       await fs.promises.writeFile(this.#path, JSON.stringify(cartsUpdated));
//       return findProduct;
//     } else {
//       console.log("otro lado");
//       const cartToUpdate = carts.find((cart) =>
//         (cart.cId = cId)
//           ? (cart.products = {
//               id: pId,
//               quantity: 1,
//             })
//           : console.log("no existe el carrito cone se id")
//       );
//       console.log(cartToUpdate);
//       const cartsToAdd = await this.getCarts();
//     }
//   }
}

export default CartManager;
