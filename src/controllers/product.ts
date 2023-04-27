import bcrypt from 'bcrypt'
import { Product } from "../models/product";
import { ProductInterface } from '../types';

export const getProducts = async () => {
    try {
        const products = await Product.find()
        if (!products.length) throw new Error("No se encontraron productos en la base de datos")
        return products;
    } catch (error: any) {
        return error.message;
    }
}