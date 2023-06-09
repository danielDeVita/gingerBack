import { Product } from "../models/product";
import { ProductInterface } from '../types';

export const getProducts = async () => {
    try {
        const products = await Product.find()
        if (!products.length) throw new Error("No se encontraron productos en la base de datos")
        return products;
    } catch (error: any) {
        return error.message
    }
}

export const updateProduct = async (id: string, product: ProductInterface) => {
    try {
        return await Product.findByIdAndUpdate(id, product, { new: true })
    }
    catch (error: any) {
        return error.message;
    }
}

export const createNewProduct = async (product: ProductInterface) => {
    try {
        const newProduct = new Product(product)
        const saveProduct = await newProduct.save()
        if (!saveProduct) throw new Error('No se pudo crear el producto')
        return saveProduct
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const getProduct = async (id: string) => {
    try {
        const product = await Product.findById(id)
        if (!product) throw new Error("No se encontraron productos en la base de datos con ese ID")
        return product;
    } catch (error: any) {
        return error.message;
    }
}

export const deleteProduct = async (id: string) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) throw new Error("No se pudo eliminar el producto")
        return deletedProduct
    } catch (error: any) {
        return error.message
    }
}