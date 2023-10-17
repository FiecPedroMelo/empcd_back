"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaId = exports.EmpresaSchema = void 0;
const zod_1 = require("zod");
exports.EmpresaSchema = zod_1.z.object({
    CNPJ: zod_1.z.string(),
    RazaoSocial: zod_1.z.string(),
    NomeFantasia: zod_1.z.string(),
    Email: zod_1.z.string().min(7).max(35),
    Senha: zod_1.z.string(),
    Cep: zod_1.z.string(),
    Endereco: zod_1.z.string(),
    ImagemEmpresa: zod_1.z.string()
});
exports.EmpresaId = zod_1.z.object({
    IdEmpresa: zod_1.z.string().min(6)
});
