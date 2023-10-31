"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Vaga_controllers_1 = __importDefault(require("../controllers/Vaga.controllers"));
const VagaRouter = (0, express_1.Router)();
// VagaRouter.post("/", new VagaController().createVaga); 
// VagaRouter.put("/:idVaga", new VagaController().updateVaga); ok
VagaRouter.get("/", new Vaga_controllers_1.default().getVagas); //ok
VagaRouter.get("/:idVaga/getById", new Vaga_controllers_1.default().getVagaById); //ok
//VagaRouter.get("/:NomeFantasia", new VagaController().vagaSearcherEmpresa) 
exports.default = VagaRouter;
