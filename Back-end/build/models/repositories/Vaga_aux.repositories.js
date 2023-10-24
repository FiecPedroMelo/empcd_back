"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Vaga_aux_1 = require("../entities/Vaga_aux");
const Vaga_auxRepository = data_source_1.AppDataSource.getRepository(Vaga_aux_1.Vaga_aux);
exports.default = Vaga_auxRepository;
