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
CandidatoRouter.post('/login', new Candidato_login_controller_1.default().loginCandidato); //ok
CandidatoRouter.post('/signUp', new Candidato_login_controller_1.default().signUpCandidato); //ok
CandidatoRouter.get("/:Email/:Senha/getId", new Candidato_login_controller_1.default().GetIdCandidato); //ok
CandidatoRouter.get("/", new Candidato_controllers_1.default().getAll); //ok
CandidatoRouter.get("/:idCand", new Candidato_controllers_1.default().getCandidatoId); //ok
CandidatoRouter.put('/:idCand/updateCandidato', new Candidato_controllers_1.default().updateCandidato); //ok
CandidatoRouter.put('/:idCand/vaga/:idVaga/candidataVaga', new Vaga_controllers_1.default().candidataVaga); //ok
CandidatoRouter.delete("/:idCand/deleteCandidato", new Candidato_controllers_1.default().deleteCandidato); //ok
exports.default = CandidatoRouter;
