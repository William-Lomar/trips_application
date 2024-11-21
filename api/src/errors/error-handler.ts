import { Response } from "express";
import { CustomError } from "./custom.error";
import { InternalServerError } from "./internal-server.error";

export function errorHandler(error: any, res: Response): void {
    const customError: CustomError = error instanceof CustomError ? error : new InternalServerError(error);
    res.status(customError.status).json(customError.json());
}