import { CustomError } from "./custom.error";

export class InternalServerError extends CustomError {
    constructor(error: any) {
        super(error, "INTERNAL_SERVER_ERROR", 500);
    }
}