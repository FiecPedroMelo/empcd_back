"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Candidato_controllers_1 = __importDefault(require("../controllers/Candidato.controllers"));
const Candidato_login_controller_1 = __importDefault(require("../controllers/Candidato.login.controller"));
const Vaga_controllers_1 = __importDefault(require("../controllers/Vaga.controllers"));
const CandidatoRouter = (0, express_1.Router)();
CandidatoRouter.post('/login', new Candidato_login_controller_1.default().loginCandidato); //ok - token
CandidatoRouter.post('/signUp', new Candidato_login_controller_1.default().signUpCandidato); //ok - token
CandidatoRouter.get("/:Token/getId", new Candidato_login_controller_1.default().GetIdCandidato); //ok - token
CandidatoRouter.get("/", new Candidato_controllers_1.default().getAll); //ok - token
CandidatoRouter.get("/:Token/getById", new Candidato_controllers_1.default().getCandidatoId); //ok - token
CandidatoRouter.get("/getVagas", new Vaga_controllers_1.default().vagaSearcherCandidato); //ok - token
CandidatoRouter.get("/vaga/:TituloCargo/:DescricaoVaga", new Vaga_controllers_1.default().getIdVaga);
CandidatoRouter.get("/:IdEmpresa/getEmpresaById", new Candidato_controllers_1.default().getEmpresaId);
CandidatoRouter.put('/:Token/updateCandidato', new Candidato_controllers_1.default().updateCandidato); //ok - token
CandidatoRouter.put('/:Token/vaga/:idVaga/candidataVaga', new Vaga_controllers_1.default().candidataVaga); //ok - token
CandidatoRouter.delete("/:Token/deleteCandidato", new Candidato_controllers_1.default().deleteCandidato); //ok - token
exports.default = CandidatoRouter;
