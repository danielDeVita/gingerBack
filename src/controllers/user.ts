import bcrypt from 'bcrypt'
import { User } from "../models/user";
import { UserInterface } from '../types';

export const userSignUp = async ( { password, email }: UserInterface ) => {
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
    } catch(error: any) {
        throw new Error(error)
    }
}