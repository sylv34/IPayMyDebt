import {BaseError} from './BaseError'


export class NotFoundError extends BaseError{
    constructor(entityName: string) {
        super( `${entityName  } not found.`, 404)
    }
}