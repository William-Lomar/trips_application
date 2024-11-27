import { DriverDAO } from "../daos/driver.dao";
import { IDriverInfo } from "../models/models";

export class DriverService {
    constructor(private driverDAO: DriverDAO) { }

    async getDrivers(): Promise<IDriverInfo[]> {
        const drivers = await this.driverDAO.get();
        return drivers.map(driver => ({ id: driver.id_driver, name: driver.name_driver }));
    }
}