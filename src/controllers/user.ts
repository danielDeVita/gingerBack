import bcrypt from 'bcrypt'
import { User } from "../models/user";
import { UserInterface } from '../types';

export const userSignUp = async ({ password, email }: UserInterface) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            email,
            password: hashPassword
        })

        const saveUser = await user.save()
        if (!saveUser) throw new Error('No se pudo guardar el usuario')
        const userWithoutPassword = await User.findById(saveUser._id).select('-password')
        return userWithoutPassword
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUsers = async () => {
    try {
        const users = await User.find().select('-password')
        if (!users.length) throw new Error("No se encontraron usuarios en la base de datos")
        return users;
    } catch (error: any) {
        return error.message;
    }
}

export const getUserById = async (id: string) => {
    try {
        const foundUser = await User.findById(id).select('-password')
        if (!foundUser) throw new Error('No hay usuarios con ese id');
        return foundUser;
    } catch (error: any) {
        return error.message;
    }
}

export const deleteUser = async (id: string) => {
    try {
        const userDeleted = await User.findByIdAndDelete(id)
        return userDeleted 
    } catch (error: any) {
        throw new Error(error)
    }
}