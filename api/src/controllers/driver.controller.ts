import { Application } from "express";
import { DriverService } from "../services/driver.service";
import { errorHandler } from "../errors/error-handler";

export class DriverController {
    constructor(
        private app: Application,
        private services: {
            driverService: DriverService
        }
    ) {
        this.get()
    }

    private get() {
        this.app.get('/driver', (req, res) => {
            this.services.driverService.getDrivers().then((drivers) => {
                res.json(drivers);
            }).catch((error) => {
                errorHandler(error, res);
            })
        })
    }
}
