import { z } from "zod";

export interface CandidatoDto { 
    IdCand: string;
    NomeCompleto: string;
    Email: string;
    Telefone: string;
    CPF: string;
    DataNasc: Date;
    Endereco: string;
    Formacao: string;
    ExpProfissional: string;
    Senha: string;
    Deficiencia: string;
    Cep: string;
    ImagemCandidato: string;
    Habilidades: string;
}

export const CandidatoSchema = z.object({
    NomeCompleto: z.string(),
    Email: z.string().min(7).max(255),
    Telefone: z.string().min(9).max(14),
    CPF: z.string().min(11).max(11),
    DataNasc: z.date(),
    Endereco: z.string(),
    Formacao: z.string(),
    ExpProfissional: z.string(),
    Senha: z.string(),
    Deficiencia: z.string(),
    Cep: z.string(),
    ImagemCandidato: z.string(),
    Habilidades: z.string()
})

export const VagaId = z.object({
    IdCand: z.string().min(6)
})