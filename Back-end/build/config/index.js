"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger"));
const User_Routes_1 = __importDefault(require("../routes/User.Routes"));
const Candidato_Routes_1 = __importDefault(require("../routes/Candidato.Routes"));
const Empresa_Routes_1 = __importDefault(require("../routes/Empresa.Routes"));
const Vaga_Routes_1 = __importDefault(require("../routes/Vaga.Routes"));
const Auth_Routes_1 = __importDefault(require("../routes/Auth.Routes"));
const auth_validator_1 = require("../controllers/auth.validator");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("Combinet"));
app.get('/nome', (Res, Req) => {
    logger_1.default.info("test request");
    Res.json("Nome do projeto: Candidato");
});
app.get('/dados-fake', (req, res) => {
    setTimeout(() => res.json([3, 6, 5, 3, 2, 7, 5]), 5000);
});
app.use('/users', auth_validator_1.validator);
app.use('/api/v1/candidatos', auth_validator_1.validator);
app.use('/api/v1/empresas', auth_validator_1.validator);
app.use('/api/v1/vagas', auth_validator_1.validator);
app.use('/api/v1/users', User_Routes_1.default);
app.use('/api/v1/candidatos', Candidato_Routes_1.default);
app.use('/api/v1/empresas', Empresa_Routes_1.default);
app.use('/api/v1/vagas', Vaga_Routes_1.default);
app.use('/api/v1/auth', Auth_Routes_1.default);
app.get('/api/v1/users', (req, res) => {
    res.json([]);
});
app.get('/candidatos', (req, res) => {
    res.json([]);
});
app.get('/empresas', (req, res) => {
    res.json([]);
});
app.get('/vagas', (req, res) => {
    res.json([]);
});
exports.default = app;
