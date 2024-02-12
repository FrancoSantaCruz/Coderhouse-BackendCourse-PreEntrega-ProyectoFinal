import { cartsManager } from "../dao/MongoDB/carts.manager.js";

export const findAll = async (obj) => {
    const carts = cartsManager.findAll();
    return carts
};

export const findById = async (id) => {
    const cart = cartsManager.findById(id);
    return cart;
};

export const createOne = async (obj) => {
    const newCart = cartsManager.createOne(obj);
    return newCart;
}

export const deleteOne = async (id) => {
    const deletedCart = cartsManager.deleteOne(id);
    return deletedCart;
}

export const updateOne = async (id, obj) => {
    const updatedCart = cartsManager.updateOne({ _id: id }, obj);
    return updatedCart;
}