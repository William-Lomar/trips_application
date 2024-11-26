import axios from "axios";
import { NEstimate, NConfirm, NGetRides } from "../models/models";
import { Configs } from "../configs";

export class RideService {
    async estimate(input: NEstimate.IInput): Promise<NEstimate.IOutput> {
        const res = await axios.post<NEstimate.IOutput>(new URL('ride/estimate', Configs.apiHost).href, input);
        return res.data;
    }

    async confirm(input: NConfirm.IInput): Promise<NConfirm.IOutput> {
        const res = await axios.patch<NConfirm.IOutput>(new URL('ride/confirm', Configs.apiHost).href, input);
        return res.data;
    }

    async getRides(input: NGetRides.IInput): Promise<NGetRides.IOutput> {
        //TODO
        return {} as any
    }
}