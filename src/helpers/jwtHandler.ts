import * as jwt from 'jsonwebtoken'
import {UnauthorizedError} from '../exception/UnauthorizedError'

export default (header: string): void => {
    try {
        jwt.verify(header, 'y4oW5W&Zb')
    } catch {
        throw new UnauthorizedError()
    }
}