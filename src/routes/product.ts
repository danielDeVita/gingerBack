import express from 'express';
import { getProducts, createNewProduct } from '../controllers/product'
import { type Product } from '../types';

export const productRouter = express.Router()

productRouter.get('/', async (req, res)  => {
    try {
        const products = await getProducts();
        if (products.error) throw new Error(products.error)
        return res.status(200).json(products)
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
})

productRouter.post('/', async (req, res) => {
    try {
        const { name, description, category, image, price } = req.body
        if (!name || !description || !category || !image || !price) throw new Error('Faltan campos')
        const newProduct = await createNewProduct({ name, description, category, image, price } as Product)
        res.status(201).json({ product: newProduct })
    } catch (err: any) {
        return res.status(400).json({ error: err.message })
    }
})