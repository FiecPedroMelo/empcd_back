"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Candidato_1 = __importDefault(require("../entities/Candidato"));
const CandidatoRepository = data_source_1.AppDataSource.getRepository(Candidato_1.default);
exports.default = CandidatoRepository;
