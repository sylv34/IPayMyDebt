import {Request, Response} from 'express'
import {handleError} from '../helpers/errorsHandler'
import { CarbonEm } from '../model/CarbonEm'
import { Carbon } from '../entity/Carbon'
import { ManagerSingleton } from '../model/ManagerSingleton'
import { getToneToGramme } from '../helpers/utils'
 
const carbonEm: CarbonEm = ManagerSingleton.getCarbonInstance()

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carbons: Carbon[] = await carbonEm.findAll(req.header('Authorization'))
        res.send(carbons)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const find = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carbon: Carbon = await carbonEm.find(req.header('Authorization'), req.params.id)
        res.send(carbon)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const findAllByUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carbon: Carbon[] = await carbonEm.findByUser(req.header('Authorization'), req.params.idUser)
        res.send(carbon)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const findAllByCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carbon: Carbon[] = await carbonEm.findByUserCategory(req.header('Authorization'),req.params.idUser, req.params.idCategory)
        res.send(carbon)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carbon: Carbon = await carbonEm.create(req.header('Authorization'), req.body)
        res.send(carbon)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carbon: Carbon = await carbonEm.update(req.header('Authorization'), req.params.id, req.body)
        res.send(carbon)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
    try {
        const deleteResult = await carbonEm.remove(req.header('Authorization'), req.params.id)
        res.send(deleteResult)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const totalCarbonByUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const total: {g:number, tone:number} = await carbonEm.getTotalCarbonByUser(req.header('Authorization'), req.params.idUser)
        res.send(total)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const totalCarbonByUserCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const total: {g:number, tone:number} = await carbonEm.getTotalCarbonByCategory(req.header('Authorization'),req.params.idUser, req.params.idCategory)
        res.send(total)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}