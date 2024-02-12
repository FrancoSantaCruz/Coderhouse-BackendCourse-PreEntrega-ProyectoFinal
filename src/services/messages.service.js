import { messagesManager } from "../dao/MongoDB/messages.manager.js";

export const findAll = async () => {
    const messages = await messagesManager.findAll();
    return messages;
};

export const findById = async (id) => {
    const chat = await messagesManager.findById(id);
    return chat;
};

export const findByField = async (obj) => {
    const message = await messagesManager.findByField(obj);
    return message;
};

export const createOne = async (obj) => {
    const newMessage = await messagesManager.createOne(obj);
    return newMessage;
};

export const updateOne = async (id, obj) => {
    const updatedChat = await messagesManager.updateOne(id, obj);
    return updatedChat;
};
