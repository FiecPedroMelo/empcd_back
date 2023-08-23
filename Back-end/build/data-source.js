"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./models/entities/User"));
const Candidato_1 = __importDefault(require("./models/entities/Candidato"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "empcd",
    synchronize: true,
    logging: true,
    entities: [User_1.default, Candidato_1.default],
    subscribers: [],
    migrations: [],
});
