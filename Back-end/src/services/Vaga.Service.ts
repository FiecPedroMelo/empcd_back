import { v4 } from "uuid"
import { VagaDto } from "../models/dto/Vaga.dto"
import Vaga from "../models/entities/Vagas"
import CandidatoRepository from "../models/repositories/Candidato.repositories"
import VagaRepository from "../models/repositories/Vaga.repositories"
import EmpresaRepository from "../models/repositories/Empresa.repositories"
import { VagaPorEmpresaDto } from "../models/dto/VagaPorEmpresa.dto"
import { Vaga_aux } from "../models/entities/Vaga_aux"
import Vaga_auxRepository from "../models/repositories/Vaga_aux.repositories"

class VagaServices{
    private static instance: VagaServices
    private constructor() {}
    public static Instance(): VagaServices {
        if(!VagaServices.instance) {
            VagaServices.instance = new VagaServices()
        }
        return VagaServices.instance
    }

    

    public async createVaga(valid: VagaDto): Promise<Vaga> {
        try {
            const vaga = new Vaga()
            vaga.IdVaga = v4()
            const empresa = await EmpresaRepository.findOneBy({IdEmpresa: valid.IdEmpresa})
            if (empresa == null) throw new Error(`No empresa found`)
            vaga.empresa = empresa
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

    public async candidataVaga(IdVaga: string, IdCand: string): Promise<Vaga_aux> {
        console.log(IdVaga, IdCand)
        try {
            const vaga = await VagaRepository.findOneBy({IdVaga})
            const candidato = await CandidatoRepository.findOneBy({IdCand})
            if(!vaga) {
                return Promise.reject(new Error('Could not find Vaga'));
            }
            if(!candidato) {
                return Promise.reject(new Error('Could not find Candidato'));
            }
            if(!vaga.Status){
                return Promise.reject(new Error('Vaga is already closed'));
            }
            const vaga_aux = new Vaga_aux()
            vaga_aux.IdVagaAux = v4()
            vaga_aux.IdVaga = vaga.IdVaga
            vaga_aux.IdCand = candidato.IdCand
            return await Vaga_auxRepository.save(vaga_aux)
        } catch(err) {
            console.log(err);
            return Promise.reject(new Error('Unable to update Vaga'));
        }
    }


    public async vagaSearcher( NomeFantasia:string ): Promise< VagaPorEmpresaDto[] > {
        let vagas:VagaPorEmpresaDto[] = [];
        const empresa = await EmpresaRepository.findOneBy({NomeFantasia})
        try{
            if(empresa) {
                const vagasPorEmpresa = await VagaRepository.findBy({empresa:empresa})
                vagasPorEmpresa.forEach(vagaPorEmpresa => {
                    const vagaResponse = new VagaPorEmpresaDto();
                    vagaResponse.ImagemEmpresa = empresa.ImagemEmpresa
                    vagaResponse.NomeFantasia = empresa.NomeFantasia
                    vagaResponse.TituloCargo = vagaPorEmpresa.TituloCargo
                    vagaResponse.Descricao = vagaPorEmpresa.Descricao
                    vagas.push(vagaResponse)
                })
            }
        }catch(err) {
            console.log(err);
        }
        
        return Promise.resolve(vagas);
    }

}

export default VagaServices