"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagaId = exports.CandidatoSchema = void 0;
const zod_1 = require("zod");
exports.CandidatoSchema = zod_1.z.object({
    NomeCompleto: zod_1.z.string(),
    Email: zod_1.z.string().min(7).max(255),
    Telefone: zod_1.z.string().min(9).max(14),
    CPF: zod_1.z.string().min(11).max(11),
    DataNasc: zod_1.z.date(),
    Endereco: zod_1.z.string(),
    Formacao: zod_1.z.string(),
    ExpProfissional: zod_1.z.string(),
    Senha: zod_1.z.string(),
    Deficiencia: zod_1.z.string(),
    Cep: zod_1.z.string(),
    ImagemCandidato: zod_1.z.string(),
    Habilidades: zod_1.z.string()
});
exports.VagaId = zod_1.z.object({
    IdCand: zod_1.z.string().min(6)
});
