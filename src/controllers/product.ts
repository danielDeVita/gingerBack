import { Product } from "../models/product";

export const getProducts = async () => {
    try {
        const products = await Product.find()
        if (!products.length) throw new Error("No se encontraron productos en la base de datos")
        return products;
    } catch (error: any) {
        return error.message;
    }
}

export const getProduct = async (id: string) => {
    try {
        const product = await Product.findById(id)
        if (!product) throw new Error("No se encontraron productos en la base de datos")
        return product;
    } catch (error: any) {
        return error.message;
    }
}