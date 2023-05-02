import express, { Request, Response } from 'express';
import {getProducts, updateProduct} from '../controllers/product'
import {Product} from '../models/product';
import { ProductInterface } from '../types';
import {validateProductUpdate} from '../middlewares/productValidator';
import { validationResult } from 'express-validator';

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

