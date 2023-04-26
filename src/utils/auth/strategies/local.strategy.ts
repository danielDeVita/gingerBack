import { Strategy  } from 'passport-local'
import { User } from '../../../models/user'
import bcrypt from 'bcrypt'


export const LocalStrategy = new Strategy(async (email, password, done) => {
    try {
      const user: any = await User.find({ email })
      if (!user) {
        throw new Error('Usuario inexistente')
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        throw new Error('Contraseña incorrecta')
      }
      done(null, user)
    } catch (error) {
      done(error)
    }
  })