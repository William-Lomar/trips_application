import express, { json } from 'express';
import { Configuracoes } from './configuracoes';
import { Logger } from './logger';
import { RideController } from './controllers/ride.controller';
import { RideService } from './services/ride.service';

const app = express();
app.use(json());

new RideController(app, {
    rideService: new RideService()
});

app.listen(Configuracoes.portaHttp, () => {
    Logger.info(`Servidor rodando na porta ${Configuracoes.portaHttp}...`);
})