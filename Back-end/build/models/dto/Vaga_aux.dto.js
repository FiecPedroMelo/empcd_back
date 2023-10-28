"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagaAuxId = exports.VagaSchema = void 0;
const zod_1 = require("zod");
exports.VagaSchema = zod_1.z.object({
    IdVaga: zod_1.z.string(),
    IdCand: zod_1.z.string(),
    IdEmpresa: zod_1.z.string()
});
exports.VagaAuxId = zod_1.z.object({
    IdVagaAux: zod_1.z.string().min(6),
});
