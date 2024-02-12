import { cartsModel } from "../models/carts.model.js";
import Manager from "./manager.js";

class CartsManager extends Manager {
    constructor() {
        super(cartsModel, "products.product");
    }
}

export const cartsManager = new CartsManager();