import { CustomError } from "./custom.error";

export class RouteNotFoundError extends CustomError {
    constructor() {
        super("Rota não encontrada", "ROUTE_NOT_FOUND", 500);
    }
}