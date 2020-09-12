import {BaseError} from './BaseError'


export class UnauthorizedError extends BaseError{
    constructor() {
        super('Unauthorized request', 403)
    }
}