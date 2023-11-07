import { v4 } from "uuid"
import { VagaDto } from "../models/dto/Vaga.dto"
import Vaga from "../models/entities/Vagas"
import CandidatoRepository from "../models/repositories/Candidato.repositories"
import VagaRepository from "../models/repositories/Vaga.repositories"
import EmpresaRepository from "../models/repositories/Empresa.repositories"
import { ExibirVagaDto } from "../models/dto/ExibirVaga.dto"
import { Vaga_aux } from "../models/entities/Vaga_aux"
import Vaga_auxRepository from "../models/repositories/Vaga_aux.repositories"
import { jwtDecode } from "jwt-decode"
import * as jwt from "jsonwebtoken"
import Empresa from "../models/entities/Empresa"
import { AppDataSource } from "../data-source"

class VagaServices{
    private static instance: VagaServices
    private constructor() {}
    public static Instance(): VagaServices {
        if(!VagaServices.instance) {
            VagaServices.instance = new VagaServices()
        }
        return VagaServices.instance
    }

    public async createVaga(valid: VagaDto, Token: string): Promise<string> {
        try {
            const payload = jwtDecode(Token) as jwt.JwtPayload
            const IdEmpresa: string = payload.idEmpresa
            const vaga = new Vaga()
            const IdVaga = v4()
            vaga.IdVaga = IdVaga
            const empresa = await EmpresaRepository.findOneBy({IdEmpresa: IdEmpresa})
            if (!empresa) {
                return Promise.reject(new Error(`No empresa found`))
            }
            vaga.empresa = empresa
            vaga.TituloCargo = valid.TituloCargo
            vaga.Localizacao = valid.Localizacao
            vaga.Requisitos = valid.Requisitos
            vaga.DescricaoVaga = valid.DescricaoVaga
            vaga.Status = valid.Status
            await VagaRepository.save(vaga)
            return IdVaga
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

    public async candidataVaga(IdVaga: string, Token: string): Promise<Vaga_aux> {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        const IdCandidato: string = payload.idCand
        console.log(payload)
        try {
            const vaga = await VagaRepository.findOneBy({IdVaga})
            const candidato = await CandidatoRepository.findOneBy({IdCand: IdCandidato})
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

    public async vagaSearcherEmpresa(Token: string): Promise< ExibirVagaDto[] > {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        const IdEmpresa: string = payload.idEmpresa
        let vagas:ExibirVagaDto[] = [];
        try{
            const Empresa = await EmpresaRepository.findOneBy({IdEmpresa: IdEmpresa});
            if(!Empresa) {
                return Promise.reject(new Error('Unable to find empresa'));
            } else {
                const vagasPorEmpresa = await VagaRepository.findBy({empresa:Empresa})
                vagasPorEmpresa.forEach(vaga => {
                    const vagaResponse = new ExibirVagaDto();
                    vagaResponse.IdVaga = vaga.IdVaga;
                    vagaResponse.NomeFantasia = Empresa.NomeFantasia
                    vagaResponse.TituloCargo = vaga.TituloCargo
                    vagaResponse.DescricaoVaga = vaga.DescricaoVaga
                    vagas.push(vagaResponse)
                })
            }
        }catch(err) {
            console.log(err);
        }
        
        return Promise.resolve(vagas);
    }

    public async vagaSearcherCandidato(): Promise< ExibirVagaDto[] > {
        let vagas:ExibirVagaDto[] = []
        try {
            const TodasVagas = await AppDataSource.getRepository(Vaga)
            .createQueryBuilder('vaga')
            .leftJoinAndSelect('vaga.empresa', 'empresa')
            .getMany();
            TodasVagas.map(vaga => {
                const vagaResponse = new ExibirVagaDto();
                vagaResponse.NomeFantasia = vaga.empresa.NomeFantasia
                vagaResponse.TituloCargo = vaga.TituloCargo
                vagaResponse.DescricaoVaga = vaga.DescricaoVaga
                vagas.push(vagaResponse)
            })
        } catch (err) {
            console.log(err);
        }

        return Promise.resolve(vagas);
    }

    public async mudaStatusVaga(Token: string, IdVaga: string): Promise<Vaga> {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        const IdEmpresa: string = payload.idEmpresa
        const vaga = await AppDataSource.getRepository(Vaga)
          .createQueryBuilder('vaga')
          .leftJoinAndSelect('vaga.empresa', 'empresa')
          .where('vaga.IdVaga = :id', { id: IdVaga })
          .getOne();
        const empresa = await EmpresaRepository.findOneBy({IdEmpresa})
        if(!vaga){
            return Promise.reject(new Error(`Vaga not found`));
        } else if (!empresa){
            return Promise.reject(new Error(`Empresa not found`));
        } else if(vaga.empresa.IdEmpresa != empresa.IdEmpresa){
            return Promise.reject(new Error(`Invalid Empresa`))
        }
        if(vaga.Status){
            vaga.Status = false;
        } else if(!vaga.Status){
            vaga.Status = true;
        }
        await VagaRepository.save(vaga)
        return Promise.resolve(vaga);
    }

    public async statusVaga(Token: string, IdVaga: string): Promise<Boolean> {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        const IdEmpresa: string = payload.idEmpresa
        const vaga = await AppDataSource.getRepository(Vaga)
        .createQueryBuilder('vaga')
        .leftJoinAndSelect('vaga.empresa', 'empresa')
        .where('vaga.IdVaga = :id', { id: IdVaga })
        .getOne();
        const empresa = await EmpresaRepository.findOneBy({IdEmpresa})
        if(!vaga){
            return Promise.reject(new Error(`Vaga not found`));
        } else if (!empresa){
            return Promise.reject(new Error(`Empresa not found`));
        } else if(vaga.empresa.IdEmpresa != empresa.IdEmpresa){
            return Promise.reject(new Error(`Invalid Empresa`))
        }
        return Promise.resolve(vaga.Status);
    }

}

export default VagaServices