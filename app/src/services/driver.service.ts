import axios from "axios";
import { Configs } from "../configs";
import { IDriver } from "../models/models";

export class DriverService {
    async getDrivers(): Promise<IDriver[]> {
        const url = new URL(`driver`, Configs.apiHost);
        const res = await axios.get<IDriver[]>(url.href);
        return res.data
    }
}