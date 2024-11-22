import { Response } from "express";
import { CustomError } from "./custom.error";
import { InternalServerError } from "./internal-server.error";
import { Logger } from "../logger";

export function errorHandler(error: any, res: Response): void {
    const customError: CustomError = error instanceof CustomError ? error : new InternalServerError(error);
    if (customError instanceof InternalServerError) Logger.error('INTERNAL_SERVER_ERROR - ' + customError.message);
    res.status(customError.status).json(customError.json());
}