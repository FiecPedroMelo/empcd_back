import { jwtDecode } from "jwt-decode"
import * as jwt from "jsonwebtoken"
import { v4 } from "uuid"
import { EmpresaDto } from "../models/dto/Empresa.dto"
import Empresa from "../models/entities/Empresa"
import EmpresaRepository from "../models/repositories/Empresa.repositories"
import Vaga_auxRepository from "../models/repositories/Vaga_aux.repositories"
import vagaRepository from "../models/repositories/Vaga.repositories"
import { ExibirRelatorioDto } from "../models/dto/ExibirRelatorio.dto"
import Candidato from "../models/entities/Candidato"
import Vaga_aux from "../models/entities/Vaga_aux"
import { AppDataSource } from "../data-source"
import CandidatoRepository from "../models/repositories/Candidato.repositories"

class EmpresaServices {
    private static instance: EmpresaServices
    private constructor() {}
    public static Instance(): EmpresaServices {
        if(!EmpresaServices.instance) {
            EmpresaServices.instance = new EmpresaServices()
        }
        return EmpresaServices.instance
    }

    public async createEmpresaPerfil(valid: Empresa): Promise<Empresa> {
        try {
            const empresa = new Empresa()
            empresa.IdEmpresa = v4()
            empresa.RazaoSocial = valid.RazaoSocial
            empresa.NomeFantasia = valid.NomeFantasia
            empresa.Email = valid.Email
            empresa.Site = valid.Site
            empresa.Senha = valid.Senha
            empresa.CNPJ = valid.CNPJ
            empresa.Cidade = valid.Cidade
            empresa.Bairro = valid.Bairro
            empresa.UF = valid.UF
            empresa.Descricao = valid.Descricao
            console.log(empresa)

            return await EmpresaRepository.save(empresa)
        } catch (err) {
            return Promise.reject(new Error('Error saving empresa'));
        }
    }

    public async allEmpresa(): Promise<Empresa[]> {
        return await EmpresaRepository.find()
    }

    public async EmpresaById(Token: string): Promise<Empresa> {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        const IdEmpresa: string = payload.idEmpresa
        const empresa = await EmpresaRepository.findOneBy({IdEmpresa})
        if(empresa) {
            return Promise.resolve(empresa)
        } else {
            return Promise.reject("id Empresa not found")
        }
    }

    public async deleteEmpresaId(Token: string) {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        const IdEmpresa: string = payload.idEmpresa
        const deleteEmpresa = await EmpresaRepository.delete(IdEmpresa)
        if (!deleteEmpresa) {
            return Promise.reject(new Error('Unable to delete IdEmpresa'))
        }
        return Promise.resolve('Deleted IdEmpresa succesfully')
    }

    public async updateEmpresa(Token: string, valid: EmpresaDto): Promise<Empresa> {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        const IdEmpresa: string = payload.idEmpresa
        try {
            const data = await EmpresaRepository.findOneBy({IdEmpresa})
            if (!data) {
                return Promise.reject('Could not find IdEmpresa')
            }
            data.RazaoSocial = valid.RazaoSocial
            data.NomeFantasia = valid.NomeFantasia
            data.Email = valid.Email
            data.Site = valid.Site
            data.Senha = valid.Senha
            data.CNPJ = valid.CNPJ
            data.Cidade = valid.Cidade
            data.Bairro = valid.Bairro
            data.UF = valid.UF
            data.Descricao = valid.Descricao
            return await EmpresaRepository.save(data)
        } catch (err) {
            return Promise.reject(new Error('Unable to update Empresa'));
        }
    }


        /*public async getRelatorio (Token:string, idVaga:string): Promise<ExibirRelatorioDto[]> {
        let vaga_aux = await AppDataSource.getRepository(Vaga_aux)
        .createQueryBuilder('vaga_aux')
        .leftJoinAndSelect('vaga_aux.candidato', 'candidato')
        .where('vaga_aux.IdVaga = :idVaga', {idVaga: idVaga.toString()})
        .andWhere('vaga_aux.IdCand = candidato.IdCand')
        .getOne();
        if(!vaga_aux){
            return Promise.reject(new Error('sim'))
        }
        let exibirRelatorio = new ExibirRelatorioDto();
        exibirRelatorio.NomeCompleto = vaga_aux.candidato.NomeCompleto;
        exibirRelatorio.Email = vaga_aux.candidato.Email;
        exibirRelatorio.Telefone = vaga_aux.candidato.Telefone;
        return Promise.resolve(exibirRelatorio)
    }*/


    public async getRelatorio (Token:string, idVaga:string): Promise<ExibirRelatorioDto[]> {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        const idEmpresa:string = payload.idEmpresa
        let relatorios:ExibirRelatorioDto[] = [];
        try{
            const vaga = await vagaRepository.findOneBy({IdVaga: idVaga})
            if(!vaga){
                return Promise.reject(new Error('Unable to find vaga'));
            }
            let vagaAux = await AppDataSource.getRepository(Vaga_aux)
            .createQueryBuilder('vaga_aux')
            .leftJoinAndSelect('vaga_aux.vagas', 'vagas')
            .leftJoinAndSelect('vaga_aux.candidato', 'candidato')
            .where('vaga_aux.vagas = :Vaga', {Vaga: idVaga})
            .getMany();
            let newVagaAux: Vaga_aux[] = []
            vagaAux.forEach(vagaaux => {
                if(vagaaux.vagas.IdVaga == vaga.IdVaga){
                    newVagaAux.push(vagaaux)
                }
            })
            newVagaAux.forEach(vagaAux => {
                let candidato = vagaAux.candidato
                let relatorio = new ExibirRelatorioDto();
                relatorio.IdCand = candidato.IdCand;
                relatorio.NomeCompleto = candidato.NomeCompleto;
                relatorio.Email = candidato.Email;
                relatorio.Telefone = candidato.Telefone;
                relatorios.push(relatorio);
            })
        }catch(err){
            console.log(err)
        }
        return Promise.resolve(relatorios)
    }

    public async IdbyCandidato(IdCand: string): Promise<Candidato> {
        const candidato = await CandidatoRepository.findOneBy({IdCand: IdCand})
        if (candidato) {
            return Promise.resolve(candidato)
        } else{
            return Promise.reject("id Candidato not found")
        }
    }    
}

export default EmpresaServices;
