import {Request, Response} from 'express'
import {getConnection} from 'typeorm'
import {User} from '../entity/User'
import * as jwt from 'jsonwebtoken'
import { ManagerSingleton } from '../model/ManagerSingleton'
import { UserEm } from '../model/UserEm'

const userEm: UserEm = ManagerSingleton.getUserInstance()

export const  login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user : User = await userEm.findByEmail(req.body.email) 
        user.token = jwt.sign({
            sub: user.id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        }, 'y4oW5W&Zb')
        res.json(user).end()
    } catch (e) {
        res.status(500).send({message: e})
    }
    return res
}

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user : User =  await getConnection(process.env.NODE_ENV).getRepository(User).findOne(req.body.id)
        user.password = req.body.pwd1
        await getConnection(process.env.NODE_ENV).getRepository(User).save(user)
        res.send()
    } catch (e){
        res.status(500).send({message: e})
    }
    return res
}
