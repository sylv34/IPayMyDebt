import {BaseError} from './BaseError';


export class ConnectionError extends BaseError{
    constructor() {
        super('Connection error', 500)
    }
}