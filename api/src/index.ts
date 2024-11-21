import express, { json } from 'express';
import { Configuracoes } from './configuracoes';
import { Logger } from './logger';

const app = express();
app.use(json());

app.listen(Configuracoes.portaHttp, () => {
    Logger.info(`Servidor rodando na porta ${Configuracoes.portaHttp}...`);
})