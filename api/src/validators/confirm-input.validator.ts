import { InvalidDataError } from "../errors/invalid-data.error";
import { NConfirm } from "../models/models";
import { Validator } from "./validator-implements";
import { z } from 'zod';

const inputSchema = z.object({
    customer_id: z.string(),
    origin: z.string(),
    destination: z.string(),
    distance: z.number(),
    duration: z.string(),
    driver: z.object({
        id: z.number(),
        name: z.string()
    }),
    value: z.number()
})

export class ConfirmInputValidator implements Validator<NConfirm.IInput> {
    validate(object: object): NConfirm.IInput {
        try {
            const input = inputSchema.parse(object);
            if (input.origin == input.destination) throw 'Origem e destino não podem ser os mesmos';
            return input;
        } catch (error) {
            throw new InvalidDataError();
        }
    }
}