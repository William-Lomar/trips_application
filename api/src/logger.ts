import path from 'path';
import winston, { format } from "winston";
const { combine, timestamp, json } = format;

export class Logger {
    static logger = winston.createLogger({
        format: combine(
            timestamp(),
            json()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: path.join(__dirname, 'logs', 'logs.json') })
        ]
    });

    static info(mensagem: string) {
        this.logger.info(mensagem);
    }

    static warn(mensagem: string) {
        this.logger.warn(mensagem);
    }

    static error(mensagem: string) {
        this.logger.error(mensagem);
    }
}