"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Vaga_controllers_1 = __importDefault(require("../controllers/Vaga.controllers"));
const Vagarouter = (0, express_1.Router)();
Vagarouter.post("/", new Vaga_controllers_1.default().createVaga);
Vagarouter.get("/", new Vaga_controllers_1.default().getVagas);
Vagarouter.get("/:idVaga", new Vaga_controllers_1.default().getVagaById);
exports.default = Vagarouter;