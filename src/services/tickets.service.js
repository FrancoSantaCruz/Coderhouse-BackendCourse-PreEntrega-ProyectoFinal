import { ticketsManager } from "../dao/MongoDB/tickets.manager.js";
import { hashData } from "../utils.js";

export const findAll = async () => {
    const ticket = ticketsManager.findAll();
    return ticket;
};
export const findById = async (id) => {
    const ticket = ticketsManager.findById(id);
    return ticket;
};
export const create = async (amount, emailPurchaser) => {
    const hashEmail = await hashData(emailPurchaser);
    const currentDate = new Date()
    const code = `${currentDate.getDay()}${currentDate.getMonth()}${currentDate.getFullYear()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}<${hashEmail}`

    const ticket = {
        code: code,
        amount: amount,
        purchaser: emailPurchaser
    }

    const ticketGenerated = ticketsManager.createOne(ticket);
    return ticketGenerated;
};
export const update = async (id, obj) => {
    const ticket = ticketsManager.updateOne(id, obj);
    return ticket;
};
export const deleteOne = async (id) => {
    const ticket = ticketsManager.deleteOne(id);
    return ticket;
};
