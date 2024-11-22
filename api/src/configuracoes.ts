import { config } from "dotenv";
config();

export const Configuracoes = {
    portaHttp: 3000,
    googleApiKey: process.env.GOOGLE_API_KEY!
}