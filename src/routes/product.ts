import express from 'express';
import { getProducts, getProduct } from '../controllers/product'

export const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    try {
        const products = await getProducts();
        if (products.error) throw new Error(products.error)
        return res.status(200).json(products)
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
})

productRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await getProduct(id);
        if (product.error) throw new Error(product.error)
        return res.status(200).json(product)
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
})
