import mongoose from 'mongoose'
import { ProductInterface } from '../types';

const Schema = mongoose.Schema

import { softDeletePlugin, SoftDeleteModel } from 'soft-delete-plugin-mongoose';

const productSchema = new Schema ({
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        public_id: String,
        secure_url: String,
    },
    price: {
        type: Number,
        required: true
    }
})
productSchema.plugin(softDeletePlugin)

export const Product = mongoose.model<ProductInterface, SoftDeleteModel<ProductInterface>>('Product', productSchema )
