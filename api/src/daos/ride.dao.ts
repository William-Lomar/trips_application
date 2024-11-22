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

//TODO
export class RideDAO {
    async get(filter?: { customer_id?: string, id_driver?: number }): Promise<IRideInfo[]> {
        return []
    }

    async post(ride: IRidePost): Promise<IRide> {
        return {} as any
    }
}