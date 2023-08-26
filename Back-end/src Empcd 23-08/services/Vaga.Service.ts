import { v4 } from "uuid"
import { VagaDto } from "../models/dto/Vaga.dto"
import Vaga from "../models/entities/Vaga"
import VagaRepository from "../models/repositories/Vaga.repositories"

class VagaServices{
    private static instance: VagaServices
    private constructor() {}
    public static Instance(): VagaServices {
        if(!VagaServices.instance) {
            VagaServices.instance = new VagaServices()
        }
        return VagaServices.instance
    }

    public async createVaga(valid: Vaga): Promise<Vaga> {
        try {
            const vaga = new Vaga()
            vaga.IdVaga = v4()
            vaga.IdEmpresa = valid.IdEmpresa
            vaga.TituloVaga = valid.TituloVaga
            vaga.Local = valid.Local
            vaga.DataPostagem = valid.DataPostagem
            vaga.Requisitos = valid.Requisitos
            vaga.DataFinal = valid.DataFinal
            return await VagaRepository.save(vaga)
        } catch (err) {
            return Promise.reject(new Error('Error saving vaga'));
        }
    }

    public async updateVaga(IdVaga: string, valid: VagaDto): Promise<Vaga> {
        try {
            const data = await VagaRepository.findOneBy({IdVaga})
            if (!data) {
                return Promise.reject(new Error('Could not find IdVaga'));
            }
            data.TituloVaga = valid.TituloVaga
            data.Local = valid.Local
            data.DataPostagem = valid.DataPostagem
            data.Requisitos = valid.Requisitos
            data.DataFinal = valid.DataFinal
            return await VagaRepository.save(data)
        } catch (err) {
            return Promise.reject(new Error('Unable to update Vaga'));
        }
    }

    public async getVaga(): Promise<Vaga[]> {
        return await VagaRepository.find()
    }

}

export default VagaServices