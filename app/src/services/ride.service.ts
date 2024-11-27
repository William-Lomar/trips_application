import axios from "axios";
import { NEstimate, NConfirm, NGetRides, IDriver } from "../models/models";
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
        const url = new URL(`ride/${input.customer_id}`, Configs.apiHost);
        if (typeof input.driver_id == 'number') url.searchParams.set('driver_id', input.driver_id.toString())
        const res = await axios.get<NGetRides.IOutput>(url.href);

        return {
            customer_id: res.data.customer_id,
            rides: res.data.rides.map((ride) => {
                return {
                    ...ride,
                    date: new Date(ride.date)
                }
            })
        };
    }
}