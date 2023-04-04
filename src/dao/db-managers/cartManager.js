import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";
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
        const cartsfiltered = await cartModel
          .find({ _id: `${cId}` })
          .populate("products.product");
        console.log(JSON.stringify(cartsfiltered, null, "\t"));
        return cartsfiltered;
      } else {
        const prodsInCart = await cartModel.find().lean();
        return prodsInCart;
      }
    } catch (error) {
      return [];
    }
  }

  async addProductToCart2(cId, pId, quanty) {
    try {
      //revisar que el cId exista
      const cart = await cartModel.findById(cId);
      if (cart) {
        //revisar que el producto si existe
        const prodToAdd = await item.getProductById(pId);
        if (prodToAdd) {
          //revisar si existe el prod en el carrito
          let isInCart = await cartModel.exists({_id: cId,"products.product": pId});
          let quantyToAdd = quanty ? quanty : 1;
          if (isInCart === null) {
            console.log("prod NO ESTA EN EL CARRITO");
            let updateCart = await cartModel.updateOne({_id: cId},
           {$push: {products:{product: pId, quantity:quantyToAdd}}},
          )
          const cartupdated = await cartModel.findById(cId);
            console.log(cartupdated);
          return updateCart,cartupdated
          } else {
            console.log("prod si esta en el carrito");
            let updateProdInCart = await cartModel.findOneAndUpdate({_id: cId,"products.product": pId},
              {$set: {products:{product: pId, quantity:quantyToAdd}}},
            );
            const cartupdated = await cartModel.findById(cId);
            console.log(cartupdated);
            return updateProdInCart, cartupdated;
          }
          

          
        } else {
          return "no existe el producto";
        }
      } else {
        return "no existe el carrito";
      }
    } catch (error) {}
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
          //agregar prod si no existe en el carrito
          let prodExist = cart.products.some((p) => p.product._id === pId);
          // let prodExist = cartModel.find({_id:ObjectId(pId)});
          console.log(`esto es de cart.products ${prodExist}`);
          if (prodExist) {
            let chkquanty = quanty ? quanty : 1;
            if (chkquanty > 1) {
              let addMany = cart.products.map((p) => {
                if (p.product === pId) {
                  return {
                    ...p,
                    quantity: p.quantity + Number(quanty),
                  };
                }
                return p;
              });
              console.log(`esto es de addMany, ${addMany}`);
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
              console.log(`esto es de agrega 1 ${addOne}`);
              cart.products = addOne;
              return cart.save();
            }

            return "ya existe el producto y se agrega";
          } else {
            //se revisa quantity si no existe el producto
            let quantyDirect;
            if (quanty > 1) {
              quantyDirect = quanty;
            } else {
              quantyDirect = 1;
            }
            let addProd = [
              ...cart.products,
              { product: pId, quantity: Number(quantyDirect) },
            ];
            console.log(`esto es de add de cero`);
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

  async addProductArray(cId, arr) {
    try {
      console.log(cId);
      if (!cId || !arr) {
        console.log("falta info");
        return "falta info";
      } else {
        console.log(arr);

        let test = await this.getCarts(cId);
        console.log(test);
        let addArr = await cartModel.updateOne(
          { _id: cId },
          { $push: { products: { $each: arr } } }
        );
        console.log(addArr);
        return addArr;
      }
    } catch (error) {
      return "error en upppadad";
    }
  }

  async clearCart(cId) {
    let cartToClear = await cartModel.updateOne(
      { _id: cId },
      { $pull: { products: {} } }
    );
    return cartToClear;
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
