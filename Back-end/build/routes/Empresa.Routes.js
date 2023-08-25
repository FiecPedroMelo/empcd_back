"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Empresa_controllers_1 = __importDefault(require("../controllers/Empresa.controllers"));
const Vaga_controllers_1 = __importDefault(require("../controllers/Vaga.controllers"));
const Empresarouter = (0, express_1.Router)();
Empresarouter.post("/create", new Empresa_controllers_1.default().createEmpresa);
Empresarouter.get("/getAll", new Empresa_controllers_1.default().getAll);
Empresarouter.get("/getEmpresaId", new Empresa_controllers_1.default().getEmpresaId);
Empresarouter.post("/delete", new Empresa_controllers_1.default().deleteEmpresa);
Empresarouter.post('/update', new Empresa_controllers_1.default().updateEmpresa);
Empresarouter.post("/createVaga", new Vaga_controllers_1.default().createVaga);
Empresarouter.post("/updateVaga", new Vaga_controllers_1.default().updateVaga);
exports.default = Empresarouter;
