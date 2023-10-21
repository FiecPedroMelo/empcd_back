import { z } from "zod";

export interface VagaDto {
    IdVaga: string;
    IdEmpresa: string;
    TituloCargo: string;
    Localizacao: string;
    DataPostagem: Date;
    Requisitos: string;
    Descricao: string;
}
export const VagaSchema = z.object({
    IdEmpresa: z.string(),
    TituloCargo: z.string(),
    Localizacao: z.string(),
    DataPostagem: z.date(),
    Requisitos: z.string(),
    Descricao: z.string()
})

export const VagaId = z.object({
    IdVaga: z.string().min(6)
})