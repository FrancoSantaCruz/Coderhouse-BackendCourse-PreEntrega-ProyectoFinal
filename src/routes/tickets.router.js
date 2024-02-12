import { Router } from "express";
import { findTickets, findTicketById, createTicket, updateTicket, deleteTicket  } from "../controllers/tickets.controller.js";

const router = Router();

router.get('/', findTickets);
router.get('/:tid', findTicketById);
router.post('/new', createTicket);
router.put('/update/:tid', updateTicket);
router.delete('/delete/:tid', deleteTicket);

export default router;