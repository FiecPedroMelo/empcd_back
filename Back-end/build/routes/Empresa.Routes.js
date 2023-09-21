"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Empresa_controllers_1 = __importDefault(require("../controllers/Empresa.controllers"));
const Vaga_controllers_1 = __importDefault(require("../controllers/Vaga.controllers"));
const Empresarouter = (0, express_1.Router)();
Empresarouter.post("/", new Empresa_controllers_1.default().createEmpresa); //ok
Empresarouter.get("/", new Empresa_controllers_1.default().getAll); //ok
Empresarouter.get("/:idEmpresa", new Empresa_controllers_1.default().getEmpresaId); //ok
Empresarouter.delete("/:idEmpresa", new Empresa_controllers_1.default().deleteEmpresa); //ok
Empresarouter.put('/:idEmpresa', new Empresa_controllers_1.default().updateEmpresa); //ok
Empresarouter.post("/:idEmpresa/vaga/", new Vaga_controllers_1.default().createVaga); //ok
Empresarouter.put("/vaga/:idVaga", new Vaga_controllers_1.default().updateVaga); //ok
exports.default = Empresarouter;
