"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Empresa_controllers_1 = __importDefault(require("../controllers/Empresa.controllers"));
const Vaga_controllers_1 = __importDefault(require("../controllers/Vaga.controllers"));
const Empresa_login_Controllers_1 = __importDefault(require("../controllers/Empresa.login.Controllers"));
const multer_config_1 = require("../config/multer-config");
const EmpresaRouter = (0, express_1.Router)();
EmpresaRouter.post("/login", new Empresa_login_Controllers_1.default().loginEmpresa); //ok
EmpresaRouter.post("/signup", new Empresa_login_Controllers_1.default().signUpEmpresa); //ok
EmpresaRouter.put('/update-image', multer_config_1.upload.single('image'), new Empresa_login_Controllers_1.default().updateEmpresaImage); //ver
EmpresaRouter.post("/", new Empresa_controllers_1.default().createEmpresa); //ok
EmpresaRouter.get("/", new Empresa_controllers_1.default().getAll); //ok
EmpresaRouter.get("/:idEmpresa", new Empresa_controllers_1.default().getEmpresaId); //ok
EmpresaRouter.delete("/:idEmpresa", new Empresa_controllers_1.default().deleteEmpresa); //ok
EmpresaRouter.put('/:idEmpresa', new Empresa_controllers_1.default().updateEmpresa); //ok
EmpresaRouter.post("/:idEmpresa/vaga/", new Vaga_controllers_1.default().createVaga); //ok
EmpresaRouter.put("/vaga/:idVaga", new Vaga_controllers_1.default().updateVaga); //ok
exports.default = EmpresaRouter;
