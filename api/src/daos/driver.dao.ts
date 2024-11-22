import { metersToKilometers } from "../utils";
import { database } from "./database-connection"

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
    async getAvailableByDistance(distanceMeters: number): Promise<IDriver[]> {
        return database<IDriver>('driver').where('km_min_driver', '<=', metersToKilometers(distanceMeters));
    }

    async get(filter?: { id_driver?: number }): Promise<IDriver[]> {
        const sql = database<IDriver>('driver')
        if (typeof filter?.id_driver == 'number') sql.where('id_driver', filter.id_driver);
        return sql;
    }
}