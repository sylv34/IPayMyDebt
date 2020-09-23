import {BaseError} from './BaseError'


export class LoginFailedError extends BaseError{
    constructor() {
        super('Mot de passe invalide', 401)
    }
}