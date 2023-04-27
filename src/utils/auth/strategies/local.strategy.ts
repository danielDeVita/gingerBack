import { Strategy  } from 'passport-local'
import { User } from '../../../models/user'
import bcrypt from 'bcrypt'


const LocalStrategy = new Strategy({ usernameField: "email" },async (email, password, done) => {
    try {
      const user: any = await User.findOne({ email })
      if (!user) {
        throw new Error('Usuario inexistente')
      }
      const isMatch = await bcrypt.compare(password, user.password )
      console.log('execute')
      if (!isMatch) {
        throw new Error('Contraseña incorrecta')
      }
      done(null, user)
    } catch (error) {
      done(error)
    }
})

export default LocalStrategy