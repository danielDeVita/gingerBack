import express from 'express';
import {getProducts} from '../controllers/product'
import {Product} from '../models/product';

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

