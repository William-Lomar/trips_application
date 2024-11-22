import { CustomError } from "./custom.error";

export class InvalidDistanceError extends CustomError {
    constructor() {
        super('Quilometragem inválida para o motorista', 'INVALID_DISTANCE', 406)
    }
}