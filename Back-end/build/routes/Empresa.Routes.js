"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Empresa_controllers_1 = __importDefault(require("../controllers/Empresa.controllers"));
const Empresarouter = (0, express_1.Router)();
Empresarouter.post("/create", new Empresa_controllers_1.default().createEmpresa);
Empresarouter.get("/getAll", new Empresa_controllers_1.default().getAll);
Empresarouter.get("/getEmpresaId", new Empresa_controllers_1.default().getEmpresaId);
Empresarouter.post("/delete", new Empresa_controllers_1.default().deleteEmpresa);
Empresarouter.post('/update', new Empresa_controllers_1.default().updateEmpresa);
exports.default = Empresarouter;
