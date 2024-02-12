import { findAll, findById, create, update, deleteOne } from "../services/tickets.service.js";
import { hashData } from "../utils.js";

export const findTickets = async (req, res) => {
    try {
        const tickets = await findAll();
        res.status(200).json({ message: 'Tickets found.', tickets });
    } catch (error) {
        res.status(500).json(error.message);
    };
};

export const findTicketById = async (req, res) => {
    const { tid } = req.params;
    try {
        const ticket = await findById(tid);
        if (!ticket) throw new Error(`Ticket N° ${tid} doesn't exists.`);
        res.status(200).json({ message: "Ticket found.", ticket });
    } catch (error) {
        res.status(500).json(error.message);
    };
};

export const createTicket = async (req, res) => {
    try {
        const { amount } = req.body;
        if(!amount) throw new Error("Missing data.")
        const ticket = await create(amount, req.user.email);
        res.status(200).json({message: "Ticket generated.", ticket});
    } catch (error) {
        res.status(500).json(error.message);
    };
};

export const updateTicket = async (req, res) => {
    try {
        console.log("Todavía no estoy funcionando :D")
    } catch (error) {
        res.status(500).json(error.message);
    };
};

export const deleteTicket = async (req, res) => {
    const { tid } = req.params;
    try {
        const ticket = deleteOne(tid);
        res.status(200).json({message: "Ticket deleted.", ticket});
    } catch (error) {
        res.status(500).json(error.message);
    };
};
