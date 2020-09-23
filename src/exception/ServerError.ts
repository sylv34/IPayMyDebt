import {BaseError} from './BaseError'


export class ServerError extends BaseError{
    constructor() {
        super('', 500)
    }
}