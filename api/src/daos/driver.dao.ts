export interface IDriver {
    id_driver: number,
    name_driver: string,
    description_driver: string,
    vehicle_driver: string,
    rate_driver: number,
    rating_driver: number,
    comment_driver: string,
    km_min_driver: number
}

export class DriverDAO {
    async getByMinDistance(distanceMeters: number): Promise<IDriver[]> {
        //TODO
        return []
    }

    async get(filter?: { id_driver?: number }): Promise<IDriver[]> {
        //TODO
        return []
    }
}