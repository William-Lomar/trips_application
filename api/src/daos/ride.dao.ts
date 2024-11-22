import { database } from "./database-connection";

export interface IRide {
    id_ride: number,
    customer_id: string,
    date_ride: Date,
    origin_ride: string,
    destination_ride: string,
    distance_ride: number,
    duration_ride: string,
    id_driver: number,
    value_ride: number
}

export interface IRideInfo extends IRide {
    name_driver: string
}

export interface IRidePost extends Omit<IRide, 'id_ride'> { }

export class RideDAO {
    async get(filter?: { customer_id?: string, id_driver?: number }): Promise<IRideInfo[]> {
        const sql = database<IRideInfo>('ride').select('ride.*', 'driver.name_driver')
            .innerJoin('driver', 'driver.id_driver', 'ride.id_driver');

        if (filter?.customer_id) sql.where('ride.customer_id', filter.customer_id)
        if (typeof filter?.id_driver == 'number') sql.where('ride.id_driver', filter.id_driver)

        return sql
    }

    async post(ride: IRidePost): Promise<IRide> {
        return database<IRide>('ride').insert(ride);
    }
}