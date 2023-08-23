import { z } from "zod";

export interface VagaDto {
    IdVaga: string;
    IdEmpresa: string;
    TituloVaga: string;
    Local: string;
    DataPostagem: Date;
    Requisitos: string;
    DataFinal: Date;
}