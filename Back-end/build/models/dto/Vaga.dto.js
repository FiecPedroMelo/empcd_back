"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagaId = exports.VagaSchema = void 0;
const zod_1 = require("zod");
exports.VagaSchema = zod_1.z.object({
    IdEmpresa: zod_1.z.string(),
    TituloCargo: zod_1.z.string(),
    Localizacao: zod_1.z.string(),
    DataPostagem: zod_1.z.date(),
    Requisitos: zod_1.z.string(),
    Descricao: zod_1.z.string()
});
exports.VagaId = zod_1.z.object({
    IdVaga: zod_1.z.string().min(6)
});
