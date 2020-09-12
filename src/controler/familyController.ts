import {Request, Response} from 'express'
import {handleError} from '../helpers/errorsHandler'
import {FamilyEm} from '../model/FamilyEm'
import { Family } from '../entity/Family'
import { User } from '../entity/User'
import { ManagerSingleton } from '../model/ManagerSingleton'
import { FamilyKw } from '../entity/FamilyKw'
import { Carbon } from '../entity/Carbon'
 
const familyEm: FamilyEm = ManagerSingleton.getFamilyInstance()

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const families: Family[] = await familyEm.findAll(req.header('Authorization'))
        res.send(families)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const find = async (req: Request, res: Response): Promise<Response> => {
    try {
        const family: Family = await familyEm.find(req.header('Authorization'), req.params.id)
        res.send(family)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const findUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users: User[] = await familyEm.findUsers(req.header('Authorization'), req.params.id)
        res.send(users)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const family: Family = await familyEm.create(req.header('Authorization'), req.body)
        res.send(family)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const family: Family = await familyEm.update(req.header('Authorization'), req.params.id, req.body)
        res.send(family)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
    try {
        const deleteResult = await familyEm.remove(req.header('Authorization'), req.params.id)
        res.send(deleteResult)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const addStartKw = async (req: Request, res: Response): Promise<Response> => {
    try {
        const family: FamilyKw = await familyEm.addStartKw(req.header('Authorization'), req.params.id, req.body.kw)
        res.send(family)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const addEndKw = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carbon: Carbon = await familyEm.addEndKw(req.header('Authorization'), req.params.id, req.body.kw)
        res.send(carbon)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}
