import {Router} from 'express'
import {changePassword, login} from '../controler/authController'

export const authRouter = ():Router => Router()
    .post('/login', login)
    .post('/changePassword', changePassword)