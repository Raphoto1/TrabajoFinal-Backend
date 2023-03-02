import fs from "fs";

class CartManager {
    #path = "./src/server/cart.json";
    constructor(path){
        path = this.#path;
    }
}

export default CartManager;