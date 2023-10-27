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
EmpresaRouter.post("/login", new Empresa_login_Controllers_1.default().loginEmpresa);
EmpresaRouter.post("/signup", new Empresa_login_Controllers_1.default().signUpEmpresa);
EmpresaRouter.put('/update-image', multer_config_1.upload.single('image'), new Empresa_login_Controllers_1.default().updateEmpresaImage);
EmpresaRouter.post("/", new Empresa_controllers_1.default().createEmpresa);
EmpresaRouter.get("/", new Empresa_controllers_1.default().getAll);
EmpresaRouter.get("/:idEmpresa", new Empresa_controllers_1.default().EmpresaById);
EmpresaRouter.get("/:Email/:Senha", new Empresa_login_Controllers_1.default().GetIdEmpresa);
EmpresaRouter.delete("/:idEmpresa", new Empresa_controllers_1.default().deleteEmpresa);
EmpresaRouter.put('/:idEmpresa', new Empresa_controllers_1.default().updateEmpresa);
EmpresaRouter.post("/:idEmpresa/vaga", new Vaga_controllers_1.default().createVaga);
EmpresaRouter.put("/vaga/:idVaga", new Vaga_controllers_1.default().updateVaga);
EmpresaRouter.get("/:idEmpresa/vaga", new Vaga_controllers_1.default().vagaSearcherEmpresa);
exports.default = EmpresaRouter;
