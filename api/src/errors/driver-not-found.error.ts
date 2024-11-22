import { CustomError } from "./custom.error";

export class DriverNotFoundError extends CustomError {
    constructor() {
        super('Motorista não encontrado', 'DRIVER_NOT_FOUND', 404)
    }
}
