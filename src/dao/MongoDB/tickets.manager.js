import { ticketsModel } from "../models/tickets.model.js";
import Manager from "./manager.js";

class TicketsManager extends Manager {
    constructor(){
        super(ticketsModel);
    }


}

export const ticketsManager = new TicketsManager();