import { z } from "zod";
import { NEstimate } from "../models/models";
import { Validator } from "./validator-implements";
import { InvalidDataError } from "../errors/invalid-data.error";

const inputSchema = z.object({
    customer_id: z.string(),
    origin: z.string(),
    destination: z.string()
})

export class EstimateInputValidator implements Validator<NEstimate.IInput> {
    validate(object: object): NEstimate.IInput {
        try {
            const input = inputSchema.parse(object);
            if (input.origin == input.destination) throw 'Origem e destino não podem ser os mesmos';
            return input;
        } catch (error) {
            throw new InvalidDataError();
        }
    }
}