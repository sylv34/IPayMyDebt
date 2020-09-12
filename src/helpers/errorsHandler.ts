import {UnauthorizedError} from '../exception/UnauthorizedError'
import {ConnectionError} from '../exception/ConnectionError'
import {NotFoundError} from '../exception/NotFoundError'


export const handleError = (e: Error):{status: number, message: string} => {
    if (e instanceof UnauthorizedError || e instanceof ConnectionError || e instanceof NotFoundError) {
        return {status: e.getStatus(), message: e.message}
    } else {
        console.log(e)
        return {status: 500, message: e.message}
    }
}