import {Request, Response} from 'express'
import {handleError, HttpErrorType} from '../helpers/errorsHandler'
import { Carbon } from '../entity/Carbon'
import { ManagerSingleton } from '../model/ManagerSingleton'
import { CarEm } from '../model/CarEm'
import { Car } from '../entity/Car'
import { CarKm } from '../entity/CarKm'
 
const carEm: CarEm = ManagerSingleton.getCarInstance()

export const findAllByUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cars: Car[] = await ManagerSingleton.getCarInstance().findAllByUser(req.header('Authorization'), req.params.idUser)
        res.send(cars)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const find = async (req: Request, res: Response): Promise<Response> => {
    try {
        const car: Car = await carEm.find(req.header('Authorization'), req.params.id)
        res.send(car)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const car: Car = await carEm.create(req.header('Authorization'), req.body)
        res.send(car)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const car: Car = await carEm.update(req.header('Authorization'), req.params.id, req.body)
        res.send(car)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
    try {
        const deleteResult = await carEm.remove(req.header('Authorization'), req.params.id)
        res.send(deleteResult)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const addStartKm = async (req: Request, res: Response): Promise<Response> => {
    try {
        const car: CarKm = await carEm.addStartKm(req.header('Authorization'), req.params.id, req.body.km)
        res.send(car)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}

export const addEndKm = async (req: Request, res: Response): Promise<Response> => {
    try {
        const carbon: Carbon = await carEm.addEndKm(req.header('Authorization'), req.params.id, req.body.km)
        res.send(carbon)
    } catch(e) {
        const error: HttpErrorType = handleError(e)
        res.status(error.httpCode).send(error.message)
    }
    return res
}
