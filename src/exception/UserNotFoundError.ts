import {BaseError} from './BaseError'


export class UserNotFoundError extends BaseError{
    constructor() {
        super('Adresse email invalide', 404)
    }
}