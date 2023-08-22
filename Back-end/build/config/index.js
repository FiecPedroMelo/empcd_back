"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const User_Routes_1 = __importDefault(require("../routes/User.Routes"));
const Candidato_Routes_1 = __importDefault(require("../routes/Candidato.Routes"));
const data_source_1 = require("../data-source");
const morgan_1 = __importDefault(require("morgan"));
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
app.use('/candidato', Candidato_Routes_1.default);
app.listen(3000, () => {
    data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log("banco iniciado");
    })
        .catch((err) => console.log(err));
    console.log("Esta Rodando");
});
exports.default = app;
