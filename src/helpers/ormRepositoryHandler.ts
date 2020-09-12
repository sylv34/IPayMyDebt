import {getConnection, Repository, Entity, EntityOptions} from 'typeorm'
import {Request} from 'express'
import verifyAuth from './jwtHandler'
import {UnauthorizedError} from '../exception/UnauthorizedError'
import {ConnectionError} from '../exception/ConnectionError'

export const repository = (req: Request, entity: any): any => {
    try {
        verifyAuth(req)
        return getConnection(process.env.NODE_ENV).getRepository(entity)
    } catch (e){
        if (e instanceof UnauthorizedError) {
            throw e
        } else {
            throw new ConnectionError()
        }
    }
};