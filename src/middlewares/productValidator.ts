import { body } from 'express-validator'

export const validateProductUpdate = [
    body('name').notEmpty().withMessage('El campo nombre es obligatorio'),
    body('description').notEmpty().withMessage('El campo descripción es obligatorio'),
    body('category').notEmpty().withMessage('El campo categoría es obligatorio'),
    body('price').notEmpty().withMessage('El campo precio es obligatorio'),
]

