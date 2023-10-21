import { z } from 'zod';

export interface VagaAuxDto {
    IdVagaAux: string;
    IdVaga: string;
    IdCand: string;
    Status: boolean;
}

export const VagaSchema = z.object({
    IdVaga: z.string(),
    IdCand: z.string(),
    Status: z.boolean()
})

export const VagaAuxId = z.object({
    IdVagaAux: z.string().min(6),
})