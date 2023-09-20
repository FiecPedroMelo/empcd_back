"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Empresa_1 = __importDefault(require("../entities/Empresa"));
const EmpresaRepository = data_source_1.AppDataSource.getRepository(Empresa_1.default);
exports.default = EmpresaRepository;
