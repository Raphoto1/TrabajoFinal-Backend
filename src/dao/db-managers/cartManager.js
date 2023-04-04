import cartModel from "../models/carts.model.js";
import ProductManager from "./productManager.js";

const item = new ProductManager();

class CartManager {
  idAcum = 0;

  constructor() {}
  //creamos carrito
  async createCart() {
    const newCart = {
      products: [],
    };
    const result = await cartModel.create(newCart);
    return result;
  }
  //organizador de ids
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

  async getCarts(cId) {
    try {
      if (cId) {
        const cartsfiltered = await cartModel.find({ _id: `${cId}` }).lean();
        return cartsfiltered;
      } else {
        const prodsInCart = await cartModel.find().lean();
        return prodsInCart;
      }
    } catch (error) {
      return [];
    }
  }

  async addProductToCart(cId, pId, quanty) {
    try {
      //revisar que el cId exista
      const cart = await cartModel.findById(cId);
      if (cart) {
        console.log("si existe el carrito");
        //revisar que el producto si existe
        const prodToAdd = await item.getProductById(pId);
        if (prodToAdd._id == null) {
          console.log("el producto a agregar no existe");
          return "el producto a agregar no existe";
        } else {
          console.log("se agregara el producto");
          //revisar quantity, si no hay agregar 1, si ya existe agregarle, si hay varios quanty sumarlos
          //agregar prod si no existe
          let prodExist = cart.products.some((p) => p.product === pId);
          if (prodExist) {
            let chkquanty = quanty ? quanty : 1;
            if (chkquanty > 1) {
              console.log("mas de 1");
              console.log(Number(quanty));
              let addMany = cart.products.map((p) => {
                if (p.product === pId) {
                  return {
                    ...p,
                    quantity: p.quantity + Number(quanty),
                  };
                }
                return p;
              });
              console.log(addMany);
              cart.products = addMany;
              return cart.save();
            } else {
              console.log("solo se agrega 1");
              let addOne = cart.products.map((p) => {
                if (p.product === pId) {
                  return {
                    ...p,
                    quantity: p.quantity + 1,
                  };
                }
                return p;
              });
              console.log(addOne);
              cart.products = addOne;
              return cart.save();
            }

            return "ya existe el producto y se agrega";
          } else {
            //se revisa quantity si no existe el producto
            let quantyDirect;
            if (quanty>1) {
              quantyDirect=quanty;
            } else {
              quantyDirect=1;
            }
            let addProd = [...cart.products, { product: pId, quantity: Number(quantyDirect) }];
            cart.products = addProd;
            return cart.save();
          }
        }
      } else {
        console.log("no existe el carrito solicitado");
      }
      console.log(carts);
    } catch (error) {
      return "error en add";
    }
  }

  async deleteProd(cId, pId) {
    if (!cId || !pId) {
      console.log("falta Información");
    } else {
      let prodDeleted = await cartModel.updateOne(
        { _id: cId },
        { $pull: { products: { product: pId } } }
      );
      return prodDeleted;
    }
  }
}

export default CartManager;
