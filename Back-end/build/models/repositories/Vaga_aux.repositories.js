"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Vaga_aux_1 = __importDefault(require("../entities/Vaga_aux"));
const Vaga_auxRepository = data_source_1.AppDataSource.getRepository(Vaga_aux_1.default);
exports.default = Vaga_auxRepository;
