
export class BaseError extends Error{
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    getStatus() {
        return this.status;
    }
}