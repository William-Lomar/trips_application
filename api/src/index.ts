import express, { json } from 'express';
import { Configs } from './configs';
import { Logger } from './logger';
import { RideController } from './controllers/ride.controller';
import { RideService } from './services/ride.service';
import { GoogleMapsRouters } from './services/google-maps-routers.service';
import { DriverDAO } from './daos/driver.dao';
import { RideDAO } from './daos/ride.dao';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(json());

new RideController(app, {
    rideService: new RideService(
        new GoogleMapsRouters(),
        new DriverDAO(),
        new RideDAO()
    )
});

app.listen(Configs.httpPort, () => {
    Logger.info(`Servidor rodando na porta ${Configs.httpPort}...`);
})