import bcrypt from 'bcrypt'
import { User } from "../models/user";

interface UserSignUp {
    email: string;
    password: string
}

export const userSignUp = async ( { password, email }: UserSignUp ) => {
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