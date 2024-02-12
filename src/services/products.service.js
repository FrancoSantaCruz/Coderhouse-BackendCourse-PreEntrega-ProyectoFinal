import { productsManager } from "../dao/MongoDB/products.manager.js"

export const findAll = async (obj) => {
    const products = await productsManager.findAllPg(obj)
    return products
};

export const findById = async (id) => {
    const product = await productsManager.findById(id)
    return product
};

export const createOne = async (obj) => {
    const newProduct = await productsManager.createOne(obj);
    return newProduct;
}

export const updateOne = async (id, obj) => {
    const { title, description, code, price, status, stock, category } = obj;
    if( !title || !description || !code || !price || !status || !stock || !category ){
        throw new Error("Missing data.");
    }
    const modifyProduct = await productsManager.updateOne(id, { title, description, code, price, status, stock, category });
    return modifyProduct;
}

export const deleteOne = async (id) => {
    const deletedProduct = await productsManager.deleteOne(id);
    return deletedProduct;
}