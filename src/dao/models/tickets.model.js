import { Schema, model } from "mongoose";

const ticketsSchema = new Schema({
    code: {
        type: String,
        require: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        require: true,
    },
    purchaser: {
        type: String,
        require: true
    },
});

export const ticketsModel = model('Tickets', ticketsSchema);