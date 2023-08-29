"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const User_Routes_1 = __importDefault(require("../routes/User.Routes"));
const Candidato_Routes_1 = __importDefault(require("../routes/Candidato.Routes"));
const Empresa_Routes_1 = __importDefault(require("../routes/Empresa.Routes"));
const Vaga_Routes_1 = __importDefault(require("../routes/Vaga.Routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("Combinet"));
app.get('/nome', (Res, Req) => {
    Res.send("Nome do projeto: Candidato");
});
app.get('/dados-fake', (req, res) => {
    setTimeout(() => res.json([3, 6, 5, 3, 2, 7, 5]), 5000);
});
app.use('/users', User_Routes_1.default);
app.use('/candidatos', Candidato_Routes_1.default);
app.use('/empresas', Empresa_Routes_1.default);
app.use('/vagas', Vaga_Routes_1.default);
exports.default = app;
