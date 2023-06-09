import express from "express";
import { userSignUp, getUsers, getUserById, deleteUser } from "../controllers/user";
import jwt from 'jsonwebtoken'
import passport from "passport";
import { User } from "../models/user";
import { UserInterface } from "../types";

export const userRouter = express.Router()

userRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) throw new Error('Faltan campos requeridos')
        const user = await userSignUp({ email, password } as UserInterface)
        return res.status(201).json({ user })
    } catch (error: any) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            if (error.keyValue.hasOwnProperty('email')) return res.status(400).json({ message: 'Este email se encuentra en uso' })
        }
        return res.status(400).json({ error: error.message })
    }
})

userRouter.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
    try {
        const user: any = req.user
        const payload = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET as string)
        const response = await User.findById(user._id).select('-password')
        return res.json({ token, user: response })
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
})

userRouter.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        if (users.error) throw new Error(users.error)
        return res.status(200).json(users)
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
})

userRouter.get('/:id', async (req, res) => {
    try {
        const foundUser = await getUserById(req.params.id);
        if (foundUser.error) throw new Error(foundUser.error)
        return res.status(200).json(foundUser);
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
})

userRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const userDeleted = await deleteUser(id)
        return res.status(200).json({ user: userDeleted, message: 'Usuario eliminado' })
    } catch (err: any) {
        return res.status(400).json({ error: err.message })
    }
})