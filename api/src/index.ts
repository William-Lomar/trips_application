import express, { json } from 'express';
import { Configuracoes } from './configuracoes';

const app = express();
app.use(json());

app.listen(Configuracoes.portaHttp, () => {
    console.log(`Servidor rodando na porta ${Configuracoes.portaHttp}...`);
})