import { z } from "zod";
import { NGetRides } from "../models/models";
import { Validator } from "./validator-implements";
import { InvalidDataError } from "../errors/invalid-data.error";

const inputSchema = z.object({
    customer_id: z.string(),
    driver_id: z.number().optional()
})

export class GetRidesInputValidator implements Validator<NGetRides.IInput> {
    validate(object: object): NGetRides.IInput {
        try {
            const input = inputSchema.parse(object);
            return input;
        } catch (error) {
            throw new InvalidDataError(error);
        }
    }
}