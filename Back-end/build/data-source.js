"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Candidato_1 = __importDefault(require("./models/entities/Candidato"));
const Empresa_1 = __importDefault(require("./models/entities/Empresa"));
const Vagas_1 = __importDefault(require("./models/entities/Vagas"));
const Vaga_aux_1 = __importDefault(require("./models/entities/Vaga_aux"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "fiectcc.c6hic1eh5cuk.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "Fiec2023",
    database: "empcd",
    synchronize: true,
    logging: true,
    entities: [Candidato_1.default, Empresa_1.default, Vagas_1.default, Vaga_aux_1.default],
    subscribers: [],
    migrations: []
});
