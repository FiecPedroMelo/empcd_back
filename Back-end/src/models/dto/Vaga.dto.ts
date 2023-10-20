import { z } from "zod";

export interface VagaDto {
    IdVaga: string;
    IdEmpresa: string;
    TituloVaga: string;
    Local: string;
    DataPostagem: Date;
    Requisitos: string;
    DataFinal: Date;
    IdCandidato: string;
}
export const VagaSchema = z.object({
    IdEmpresa: z.string(),
    IdCandidato: z.string(),
    TituloVaga: z.string(),
    Local: z.string(),
    DataPostagem: z.date(),
    Requisitos: z.string(),
    DataFinal: z.date()
})

export const VagaId = z.object({
    IdVaga: z.string().min(6)
})