import { CustomError } from "./custom.error";

export class InvalidDataError extends CustomError {
    constructor(error: any) {
        super(error, 'INVALID_DATA', 400);
    }
}
