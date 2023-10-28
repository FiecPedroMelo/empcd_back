"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Empresa_controllers_1 = __importDefault(require("../controllers/Empresa.controllers"));
const Vaga_controllers_1 = __importDefault(require("../controllers/Vaga.controllers"));
const Empresa_login_Controllers_1 = __importDefault(require("../controllers/Empresa.login.Controllers"));
const EmpresaRouter = (0, express_1.Router)();
EmpresaRouter.get("/:idEmpresa/getEmpresa", new Empresa_controllers_1.default().EmpresaById); //ok
EmpresaRouter.get("/:Email/:Senha/:Token/getId", new Empresa_login_Controllers_1.default().GetIdEmpresa); //ok - conferir hash no front
EmpresaRouter.get("/:idEmpresa/getVagas", new Vaga_controllers_1.default().vagaSearcherEmpresa); //ok
EmpresaRouter.post("/login", new Empresa_login_Controllers_1.default().loginEmpresa); //ok
EmpresaRouter.post("/signup", new Empresa_login_Controllers_1.default().signUpEmpresa); //ok
EmpresaRouter.post("/:idEmpresa/vagas", new Vaga_controllers_1.default().createVaga); //ok
EmpresaRouter.put('/:idEmpresa/updateEmpresa', new Empresa_controllers_1.default().updateEmpresa); //ok
EmpresaRouter.delete("/:idEmpresa", new Empresa_controllers_1.default().deleteEmpresa);
//EmpresaRouter.get("/", new EmpresaController().getAll);
//EmpresaRouter.get("/vagas", new VagaController().getVagas); 
//EmpresaRouter.get("/vagas/:idVaga", new VagaController().getVagaById); 
//EmpresaRouter.post("/", new EmpresaController().createEmpresa); 
//EmpresaRouter.put("/vagas/:idVaga", new VagaController().updateVaga); 
exports.default = EmpresaRouter;
