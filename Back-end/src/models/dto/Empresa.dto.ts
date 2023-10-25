import { z } from "zod";

export interface EmpresaDto {
    IdEmpresa: string;
    RazaoSocial: string;
    NomeFantasia: string;
    Email: string;
    Site: string;
    Senha: string;
    CNPJ: string;
    Cidade: string;
    Bairro: string;
    UF: string;
    ImagemEmpresa: string;
}

export const EmpresaSchema = z.object({
    RazaoSocial: z.string(),
    NomeFantasia: z.string(),
    Email: z.string().min(7),
    Site: z.string(),
    Senha: z.string(),
    CNPJ: z.string().min(14).max(18),
    Cidade: z.string(),
    Bairro: z.string(),
    UF: z.string().min(2).max(2),
    ImagemEmpresa: z.string(),
})

export const EmpresaId = z.object({
    IdEmpresa: z.string().min(6)
})
