import { NConfirm, NEstimate, NGetRides } from "../models/models";

export class RideService {
    constructor() { }

    async estimate(input: NEstimate.IInput): Promise<NEstimate.IOutput> {
        return { message: "carmae" } as any
    }

    async confirm(input: NConfirm.IInput): Promise<NConfirm.IOutput> {
        return { message: "carmae" } as any
    }

    async getRides(input: NGetRides.IInput): Promise<NGetRides.IOutput> {
        return { message: "carmae" } as any
    }
}