import { DataSource } from "typeorm"
import User from "./models/entities/User"
import Candidato from "./models/entities/Candidato"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "empcd",
    synchronize: true,
    logging: true,
    entities: [User, Candidato],
    subscribers: [],
    migrations: [],
})