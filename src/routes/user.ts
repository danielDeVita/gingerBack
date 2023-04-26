import  express  from "express";
import { userSignUp } from "../controllers/user";

export const route = express.Router() 


route.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) throw new Error('Faltan campos requeridos')
        const user = await userSignUp({ email, password })
        return res.status(201).json({ user })
    } catch(error: any) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            if(error.keyValue.hasOwnProperty('email')) {
                res.status(400).json({ message: 'Este email se encuentra en uso' })
            }
        }

        return res.status(400).json({error: error.message})
    }
}) 