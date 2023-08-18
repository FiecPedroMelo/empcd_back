import { DataSource } from "typeorm"
import User from "./models/entities/User"
import Empcd from "./models/entities/Empcd"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "dwebiii",
    synchronize: true,
    logging: true,
    entities: [User, Empcd],
    subscribers: [],
    migrations: [],
})