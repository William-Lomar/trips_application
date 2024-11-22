import { CustomError } from "./custom.error";

export class InvalidDataError extends CustomError {
    constructor() {
        super('Os dados fornecidos no corpo da requisição são inválidos', 'INVALID_DATA', 400);
    }
}
