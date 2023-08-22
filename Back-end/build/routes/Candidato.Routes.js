"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Candidato_controllers_1 = __importDefault(require("../controllers/Candidato.controllers"));
const Candidatorouter = (0, express_1.Router)();
Candidatorouter.post("/create", new Candidato_controllers_1.default().createCandidato);
Candidatorouter.get("/getAll", new Candidato_controllers_1.default().getAll);
Candidatorouter.get("/getCandidatoId", new Candidato_controllers_1.default().getCandidatoId);
Candidatorouter.post("/delete", new Candidato_controllers_1.default().deleteCandidato);
Candidatorouter.post('/update', new Candidato_controllers_1.default().updateCandidato);
exports.default = Candidatorouter;
