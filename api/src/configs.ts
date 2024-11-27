import { config } from "dotenv";
import { Logger } from "./logger";
config();

const envConfigs = [
    'GOOGLE_API_KEY',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_DB',
    'POSTGRES_PASSWORD',
    'HTTP_PORT'
]

for (const envConfig of envConfigs) {
    if (!(envConfig in process.env)) {
        Logger.error(`Váriavel de ambiente obrigatória para aplicação '${envConfig}' não encontrada nas váriaveis de ambiente do processo`)
        throw new Error("Váriaveis de ambiente incompletas!");
    }
}

export const Configs = {
    httpPort: Number(process.env.HTTP_PORT!),
    googleApiKey: process.env.GOOGLE_API_KEY!,
    database: {
        host: process.env.POSTGRES_HOST!,
        port: process.env.POSTGRES_PORT!,
        user: process.env.POSTGRES_USER!,
        database: process.env.POSTGRES_DB!,
        password: process.env.POSTGRES_PASSWORD!
    }
}