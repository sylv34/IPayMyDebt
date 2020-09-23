import {Request, Response} from 'express'
import {getConnection} from 'typeorm'
import {User} from '../entity/User'
import { handleError, HttpErrorType } from '../helpers/errorsHandler'
import { ManagerSingleton } from '../model/ManagerSingleton'
import { UserEm } from '../model/UserEm'

const userEm: UserEm = ManagerSingleton.getUserInstance()

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: User = await userEm.login(req.body.email, req.body.password)
        res.send(user)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
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
