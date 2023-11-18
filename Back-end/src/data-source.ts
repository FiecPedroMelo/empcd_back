import { DataSource } from "typeorm"
import Candidato from "./models/entities/Candidato"
import Empresa from "./models/entities/Empresa"
import Vagas from "./models/entities/Vagas"
import Vaga_aux from "./models/entities/Vaga_aux"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "fiectcc.c6hic1eh5cuk.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "Fiec2023",
    database: "empcd",
    synchronize: true,
    logging: true,
    entities: [Candidato, Empresa, Vagas, Vaga_aux],
    subscribers: [],
    migrations: []
})