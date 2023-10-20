"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Candidato_1 = __importDefault(require("./models/entities/Candidato"));
const Empresa_1 = __importDefault(require("./models/entities/Empresa"));
const Vagas_1 = require("./models/entities/Vagas");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "empcd",
    synchronize: true,
    logging: true,
    entities: [Candidato_1.default, Empresa_1.default, Vagas_1.Vagas],
    subscribers: [],
    migrations: []
});
