import  express  from "express";
import { userSignUp } from "../controllers/user";
import jwt from 'jsonwebtoken'
import passport from "passport";
import { User } from "../models/user";

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


route.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
    try {
        const user: any = req.user
        const payload = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET as string)
        const response = await User.findById(user._id).select('-password')
        res.json({ token, user: response })
    } catch(error: any) {
        res.status(400).json({ error: error.message })
    }
})