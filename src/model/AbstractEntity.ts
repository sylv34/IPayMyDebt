import verifyAuth from '../helpers/jwtHandler'
import { UnauthorizedError } from '../exception/UnauthorizedError'
import { ConnectionError } from '../exception/ConnectionError'
import { EntityManager, getManager } from 'typeorm'

export abstract class AbstractEntity {
    
    verifyAndGetEntitManger(header: string): EntityManager {
        try {
            if (process.env.NODE_ENV !== 'dev') {
                verifyAuth(header)
            }
            return this.getEntityManager()
        } catch (e){
            if (e instanceof UnauthorizedError) {
                throw e
            } else {
                throw new ConnectionError()
            }
        }
    }

    getEntityManager(): EntityManager {
        return getManager(process.env.NODE_ENV)
    }
}