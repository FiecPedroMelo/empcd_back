import { z } from "zod";

export interface EmpresaDto {
    IdEmpresa: string;
    CNPJ: string;
    RazaoSocial: string;
    NomeFantasia: string;
    Email: string;
    Senha: string;
    Cep: string;
    Endereco: string;
    ImagemEmpresa: string;
}

export const EmpresaSchema = z.object({
    CNPJ: z.string(),
    RazaoSocial: z.string(),
    NomeFantasia: z.string(),
    Email: z.string().min(7).max(35),
    Senha: z.string(),
    Cep: z.string(),
    Endereco: z.string(),
    ImagemEmpresa: z.string()
})

export const EmpresaId = z.object({
    IdEmpresa: z.string().min(6)
})