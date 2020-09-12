import {Request, Response} from 'express'
import {handleError} from '../helpers/errorsHandler'
import { CarbonCategoryEm } from '../model/CarbonCategoryEm'
import { CarbonCategory } from '../entity/CarbonCategory'
import { ManagerSingleton } from '../model/ManagerSingleton'
 
const categoryEm: CarbonCategoryEm = ManagerSingleton.getCarbonCategoryInstance()

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const categories: CarbonCategory[] = await categoryEm.findAll(req.header('Authorization'))
        res.send(categories)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const find = async (req: Request, res: Response): Promise<Response> => {
    try {
        const category: CarbonCategory = await categoryEm.find(req.header('Authorization'), req.params.id)
        res.send(category)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const category: CarbonCategory = await categoryEm.create(req.header('Authorization'), req.body)
        res.send(category)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const category: CarbonCategory = await categoryEm.update(req.header('Authorization'), req.params.id, req.body)
        res.send(category)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
    try {
        const deleteResult = await categoryEm.remove(req.header('Authorization'), req.params.id)
        res.send(deleteResult)
    } catch(e) {
        res.status(handleError(e).status).send(handleError(e).message)
    }
    return res
}