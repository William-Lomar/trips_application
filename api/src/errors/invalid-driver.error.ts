import { CustomError } from "./custom.error";

export class InvalidDriverError extends CustomError {
    constructor() {
        super('Motorista invalido', 'INVALID_DRIVER', 400)
    }
}