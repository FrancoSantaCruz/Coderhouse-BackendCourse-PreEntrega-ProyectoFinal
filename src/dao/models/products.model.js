import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        require: true,
        default: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    sale: {
        type: Boolean,
        default: false
    },
    sale_percent: {
        type: Number,
        default: 0
    },
    thumbnails: {
        type: [],
        default: []
    }
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = model('Products', productsSchema)