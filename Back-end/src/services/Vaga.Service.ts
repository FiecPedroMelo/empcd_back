import { v4 } from "uuid"
import { VagaDto } from "../models/dto/Vaga.dto"
import Vaga from "../models/entities/Vagas"
import CandidatoRepository from "../models/repositories/Candidato.repositories"
import VagaRepository from "../models/repositories/Vaga.repositories"
import EmpresaRepository from "../models/repositories/Empresa.repositories"
import { ExibirVagaDto } from "../models/dto/ExibirVaga.dto"
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
            vaga.Requisitos = valid.Requisitos
            vaga.DescricaoVaga = valid.DescricaoVaga
            vaga.Status = valid.Status
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
            data.Requisitos = valid.Requisitos
            data.DescricaoVaga = valid.DescricaoVaga
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
            const empresa = await EmpresaRepository.findOneBy(vaga.empresa)
            if(!empresa) {
                return Promise.reject(new Error('Could not find Empresa'));
            }
            const vaga_aux = new Vaga_aux()
            vaga_aux.IdVagaAux = v4()
            vaga_aux.empresa = empresa
            vaga_aux.vagas = vaga
            vaga_aux.candidato = candidato
            return await Vaga_auxRepository.save(vaga_aux)
        } catch(err) {
            console.log(err);
            return Promise.reject(new Error('Unable to update Vaga'));
        }
    }


    public async vagaSearcherEmpresa( NomeFantasia: string ): Promise< ExibirVagaDto[] > {
        let vagas:ExibirVagaDto[] = [];
        const empresa = await EmpresaRepository.findOneBy({NomeFantasia})
        try{
            if(empresa) {
                const vagasPorEmpresa = await VagaRepository.findBy({empresa:empresa})
                vagasPorEmpresa.forEach(Exibirvaga => {
                    const vagaResponse = new ExibirVagaDto();
                    vagaResponse.ImagemEmpresa = Exibirvaga.empresa.ImagemEmpresa
                    vagaResponse.NomeFantasia = Exibirvaga.empresa.NomeFantasia
                    vagaResponse.TituloCargo = Exibirvaga.TituloCargo
                    vagaResponse.DescricaoVaga = Exibirvaga.DescricaoVaga
                    vagas.push(vagaResponse)
                })
            }
        }catch(err) {
            console.log(err);
        }
        
        return Promise.resolve(vagas);
    }

    public async vagaSearcherCandidato() {
        let vagas:ExibirVagaDto[] = []
        try {
            const TodasVagas = await VagaRepository.find()
            TodasVagas.forEach(vaga => {
                const vagaResponse = new ExibirVagaDto();
                vagaResponse.ImagemEmpresa = vaga.empresa.ImagemEmpresa
                vagaResponse.NomeFantasia = vaga.empresa.NomeFantasia
                vagaResponse.TituloCargo = vaga.TituloCargo
                vagaResponse.DescricaoVaga = vaga.DescricaoVaga
                vagas.push(vagaResponse)
            })
        } catch (err) {
            console.log(err);
        }
    }

}

export default VagaServices