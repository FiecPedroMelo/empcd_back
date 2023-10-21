import { v4 } from "uuid"
import { CandidatoDto } from "../models/dto/Candidato.dto"
import { VagaDto } from "../models/dto/Vaga.dto"
import Vaga from "../models/entities/Vagas"
import CandidatoRepository from "../models/repositories/Candidato.repositories"
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
            vaga.TituloCargo = valid.TituloCargo
            vaga.Localizacao = valid.Localizacao
            vaga.DataPostagem = valid.DataPostagem
            vaga.Requisitos = valid.Requisitos
            vaga.Descricao = valid.Descricao
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
            data.TituloCargo = valid.TituloCargo
            data.Localizacao = valid.Localizacao
            data.DataPostagem = valid.DataPostagem
            data.Requisitos = valid.Requisitos
            data.Descricao = valid.Descricao
            return await VagaRepository.save(data)
        } catch (err) {
            return Promise.reject(new Error('Unable to update Vaga'));
        }
    }

    public async getVaga(): Promise<Vaga[]> {
        return await VagaRepository.find()
    }

    public async getVagaById(IdVaga: string): Promise<Vaga> {
        const vaga = await VagaRepository.findOneBy({IdVaga})
        if(!vaga){
            return Promise.reject(new Error('Unable to find Vaga'))
        }
        return Promise.resolve(vaga)
    }

    public async candidataVaga(IdVaga: string, IdCand: string): Promise<Vaga> {
        console.log(IdVaga, IdCand)
        try {
            const vaga = await VagaRepository.findOneBy({IdVaga})
            console.log(vaga)
            const candidato = await CandidatoRepository.findOneBy({IdCand})
            console.log(candidato)
            if(!vaga) {
                return Promise.reject(new Error('Could not find Vaga'));
            }
            if(!candidato) {
                return Promise.reject(new Error('Could not find Candidato'));
            }
            if (!vaga.candidatos) vaga.candidatos = []
            vaga?.candidatos.push(candidato)
            
            return await VagaRepository.save(vaga)
        } catch(err) {
            console.log(err);
            return Promise.reject(new Error('Unable to update Vaga'));
        }
    }

}

export default VagaServices