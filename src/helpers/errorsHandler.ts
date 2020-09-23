import {UnauthorizedError} from '../exception/UnauthorizedError'
import {ConnectionError} from '../exception/ConnectionError'
import {UserNotFoundError} from '../exception/UserNotFoundError'
import { LoginFailedError } from '../exception/LoginFailedError'

export interface HttpErrorType {
    httpCode: number,
    message: string
}

export const handleError: (e: Error) => HttpErrorType = (e: Error): HttpErrorType => {
    if (e instanceof UnauthorizedError || e instanceof ConnectionError || e instanceof UserNotFoundError || e instanceof LoginFailedError) {
        return { httpCode: e.getCode(), message: e.message }
    } else {
        return {httpCode: 500, message: 'Une erreur est survenu. Merci de réessayer ulterieurement'}
    }
}