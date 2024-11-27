import knex from "knex";
import { Configs } from "../configs";

export const database = knex({
    client: 'pg',
    connection: Configs.database
})