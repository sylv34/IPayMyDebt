
export class BaseError extends Error{

    constructor(message: string, public httpCode: number) {
        super(message)
    }

    getCode(): number {
        return this.httpCode
    }
}