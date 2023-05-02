import express, { Request, Response } from 'express';
import { ProductInterface } from '../types';
import {validateProductUpdate} from '../middlewares/productValidator';
import { validationResult } from 'express-validator';
import { getProducts, getProduct, createNewProduct, updateProduct} from '../controllers/product'

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

productRouter.put('/:productId', validateProductUpdate, async (req: Request, res: Response) => {
    try {
        if(!validationResult(req).isEmpty()) {
            return res.status(400).json({errors: validationResult(req).array() });
        }
        const id = req.params.productId 
        const product: ProductInterface = req.body
        const updatedProduct = await updateProduct(id, product);
        if (updatedProduct.error) throw new Error(updatedProduct.error)
        return res.status(200).json(updatedProduct)
        
} catch (error: any) {
    return res.status(400).json({ error: error.message })
}  
})

productRouter.post('/', async (req, res) => {
    try {
        const { name, description, category, image, price } = req.body
        if (!name || !description || !category || !image || !price) throw new Error('Faltan campos')
        const newProduct: ProductInterface = await createNewProduct({name, description, category, image, price } as ProductInterface)
        res.status(201).json({ product: newProduct })
    } catch (err: any) {
        return res.status(400).json({ error: err.message })
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
