import "reflect-metadata"
import { DataSource } from "typeorm"
import { Donor } from "./entity/Donor"
import { Reservation } from "./entity/Reservation"
import {Location} from "./entity/Location";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "veradas",
    synchronize: true,
    logging: true,
    entities: [Reservation, Donor, Location],
    migrations: [],
    subscribers: [],
})
