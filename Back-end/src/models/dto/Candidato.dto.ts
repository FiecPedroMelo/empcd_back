import { z } from "zod";

export interface CandidatoDto { 
    IdCand: string;
    NomeCompleto: string;
    Email: string;
    CPF: string;
    Telefone: string;
    Senha: string;
    Genero: string;
    Deficiencia: string;
    DataNasc: Date;
    Estado: string;
    Cidade: string;
    Bairro: string;
    Formacao: string;
    ExpAnteriores: string;
    Habilidades: string;
    ImagemCandidato: string;
}

export const CandidatoSchema = z.object({
    NomeCompleto: z.string(),
    Email: z.string().min(7).max(255),
    CPF: z.string().min(11).max(11),
    Telefone: z.string().min(9).max(15),
    Senha: z.string(),
    Genero: z.string(),
    Deficiencia: z.string(),
    DataNasc: z.date(),
    Estado: z.string(),
    Cidade: z.string(),
    Bairro: z.string(),
    Formacao: z.string(),
    ExpAnteriores: z.string(),
    Habilidades: z.string(),
    ImagemCandidato: z.string()
})

export const VagaId = z.object({
    IdCand: z.string().min(6)
})
