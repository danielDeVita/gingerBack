import { Product } from "../models/product";
import { ProductInterface, type Product as ProductType} from '../types';



export const getProducts = async () => {
    try {
        const products = await Product.find()
        if (!products.length) throw new Error("No se encontraron productos en la base de datos")
        return products;
    } catch (error: any) {
        return error.message;
    }
}

export const createNewProduct = async (product: ProductType) => {
    try {
        const newProduct = new Product(product) 
        const saveProduct = await newProduct.save()
        if (!saveProduct) throw new Error('No se pudo crear el producto')
        return saveProduct
    } catch (err: any) {
        throw new Error(err.message)
}}

export const getProduct = async (id: string) => {
    try {
        const product = await Product.findById(id)
        if (!product) throw new Error("No se encontraron productos en la base de datos")
        return product;
    } catch (error: any) {
        return error.message;
    }
}