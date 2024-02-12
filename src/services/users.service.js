import { usersManager } from "../dao/MongoDB/users.manager.js";


export const findAll = async () => {
    const users = await usersManager.findAll();
    return users;
};

export const findById = async (id) => {
    const user = await usersManager.findById(id);
    return user;
};

export const findByEmail = async (email) => {
    const user = await usersManager.findByEmail(email);
    return user;
};

export const createOne = async (obj) => {
    const newUser = await usersManager.createOne(obj);
    return newUser
}

export const deleteOne  = async (id) => {
    const user = await usersManager.deleteOne(id);
    return user;
};
