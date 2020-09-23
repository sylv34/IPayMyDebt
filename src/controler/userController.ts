import {Request, Response} from 'express'
import {handleError, HttpErrorType} from '../helpers/errorsHandler'
import { UserEm } from '../model/UserEm'
import { User } from '../entity/User'
import { ManagerSingleton } from '../model/ManagerSingleton'
 
const userEm: UserEm = ManagerSingleton.getUserInstance()

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users: User[] = await userEm.findAll(req.header('Authorization'))
        res.send(users)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const find = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: User = await userEm.find(req.header('Authorization'), req.params.id)
        res.send(user)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: User = await userEm.create(req.header('Authorization'), req.body)
        res.send(user)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: User = await userEm.update(req.header('Authorization'), req.params.id, req.body)
        res.send(user)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
    try {
        const deleteResult = await userEm.remove(req.header('Authorization'), req.params.id)
        res.send(deleteResult)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}
