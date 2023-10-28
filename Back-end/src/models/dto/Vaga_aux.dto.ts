import { z } from 'zod';

export interface VagaAuxDto {
    IdVagaAux: string;
    IdVaga: string;
    IdCand: string;
    IdEmpresa: string;
}

export const VagaSchema = z.object({
    IdVaga: z.string(),
    IdCand: z.string(),
    IdEmpresa: z.string()
})

export const VagaAuxId = z.object({
    IdVagaAux: z.string().min(6),
})