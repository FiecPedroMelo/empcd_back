"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Candidato_controllers_1 = __importDefault(require("../controllers/Candidato.controllers"));
const Vaga_controllers_1 = __importDefault(require("../controllers/Vaga.controllers"));
const Candidatorouter = (0, express_1.Router)();
Candidatorouter.post("/", new Candidato_controllers_1.default().createCandidato);
Candidatorouter.get("/", new Candidato_controllers_1.default().getAll);
Candidatorouter.get("/:idCand", new Candidato_controllers_1.default().getCandidatoId);
Candidatorouter.delete("/:idCand", new Candidato_controllers_1.default().deleteCandidato);
Candidatorouter.put('/:idCand', new Candidato_controllers_1.default().updateCandidato);
Candidatorouter.put('/:idCand/vaga/:idVaga', new Vaga_controllers_1.default().candidataVaga);
exports.default = Candidatorouter;
