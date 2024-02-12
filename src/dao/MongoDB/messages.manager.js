import { messagesModel } from "../models/messages.model.js";
import Manager from "./manager.js";

class MessagesManager extends Manager {
    constructor() {
        super(messagesModel);
    }

    async findByField(obj) {
        const res = await messagesModel.findOne(obj).populate('chats.autor').lean()
        return res
    }
}

export const messagesManager = new MessagesManager();