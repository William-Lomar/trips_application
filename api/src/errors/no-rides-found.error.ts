import { CustomError } from "./custom.error";

export class NoRidesFoundError extends CustomError {
    constructor() {
        super('Nenhum registro encontrado', 'NO_RIDES_FOUND', 404)
    }
}