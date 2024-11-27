import { CustomError } from "./custom.error";

export class RequestApiRouteError extends CustomError {
    constructor(error: any) {
        super(error, "REQUEST_API_ROUTE_ERROR", 500);
    }
}