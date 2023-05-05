import jwt from 'jsonwebtoken'
import dotnenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
dotnenv.config()


export const checkPermissions = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization }  = req.headers
        if (!authorization) {
            throw new Error('UnAthorized')
        }

        if (!authorization.toLocaleLowerCase().startsWith('bearer')) {
            throw new Error('UnAthorized')
        }
        const token = authorization.split(' ')[1]

        const verify = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = verify

        next()
    } catch(err: any) {

        if (err.message === 'UnAthorized') {
            return res.status(404).send()
        }

        res.status(400).json({ error: err.message })
    }
}