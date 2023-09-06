import { z } from "zod";

export interface EmpresaDto {
    IdEmpresa: string;
    RazaoSocial: string;
    NomeFantasia: string;
    Email: string;
    Site: string;
    Senha: string;
}

export const EmpresaSchema = z.object({
    RazaoSocial: z.string(),
    NomeFantasia: z.string(),
    Email: z.string().min(7).max(35),
    Site: z.string().min(10).max(30),
    Senha: z.string()
})

export const EmpresaId = z.object({
    IdEmpresa: z.string().min(6)
})