import { Application } from "express";
import { RideService } from "../services/ride.service";
import { NGetRides } from "../models/models";
import { errorHandler } from "../errors/error-handler";
import { EstimateInputValidator } from "../validators/estimate-input.validator";
import { ConfirmInputValidator } from "../validators/confirm-input.validator";
import { GetRidesInputValidator } from "../validators/get-rides-input.validator";

export class RideController {
    private estimateValidator = new EstimateInputValidator();
    private confirmValidator = new ConfirmInputValidator();
    private getRidesValidator = new GetRidesInputValidator();

    constructor(
        private app: Application,
        private services: {
            rideService: RideService
        }
    ) {
        this.estimate();
        this.confirm();
        this.get();
    }

    private estimate() {
        this.app.post('/ride/estimate', async (req, res) => {
            try {
                const estimateInput = this.estimateValidator.validate(req.body);
                const response = await this.services.rideService.estimate(estimateInput);
                res.json(response);
            } catch (error) {
                errorHandler(error, res);
            }
        })
    }

    private confirm() {
        this.app.patch('/ride/confirm', async (req, res) => {
            try {
                const confirmInput = this.confirmValidator.validate(req.body);
                const response = await this.services.rideService.confirm(confirmInput);
                res.json(response);
            } catch (error) {
                errorHandler(error, res);
            }
        })
    }

    private get() {
        this.app.get('/ride/:customer_id', async (req, res) => {
            try {
                let getRidesInput: NGetRides.IInput = {
                    customer_id: req.params.customer_id,
                    driver_id: req.query.driver_id ? Number(req.query.driver_id) : undefined
                }

                getRidesInput = this.getRidesValidator.validate(getRidesInput);
                const response = await this.services.rideService.getRides(getRidesInput);
                res.json(response);
            } catch (error) {
                errorHandler(error, res);
            }
        })
    }
}
