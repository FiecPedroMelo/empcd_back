import { v4 } from "uuid";
import { CandidatoDto } from "../models/dto/Candidato.dto";
import Candidato from "../models/entities/Candidato";
import CandidatoRepository from "../models/repositories/Candidato.repositories";

class CandidatoServices {
    private static instance: CandidatoServices
    private constructor() {}
    public static Instance(): CandidatoServices {
        if (!CandidatoServices.instance) {
            CandidatoServices.instance = new CandidatoServices()
        }
        return CandidatoServices.instance
    }

    public async createCandidatoPerfil(valid: Candidato): Promise<Candidato> {
        try {
            const candidato = new Candidato()
            candidato.IdCand = v4()
            candidato.NomeCompleto = valid.NomeCompleto
            candidato.Email = valid.Email
            candidato.Telefone = valid.Telefone
            candidato.CPF = valid.CPF
            candidato.DataNasc = valid.DataNasc
            candidato.Endereco = valid.Endereco
            candidato.Formacao = valid.Formacao
            candidato.ExpProfissional = valid.ExpProfissional
            candidato.Senha = valid.Senha
            candidato.Deficiencia = valid.Deficiencia
            console.log(candidato)

            return await CandidatoRepository.save(candidato)
        } catch (err) {
            return Promise.reject(new Error('error cannot save Candidato'))
        }
    }
    public async allCandidato(): Promise<Candidato[]> {
        return await CandidatoRepository.find()
    }

    public async IdbyCandidato(IdCand: string): Promise<Candidato> {
        const idCandidato = await CandidatoRepository.findOneBy({IdCand})
        if (idCandidato) {
            return Promise.resolve(idCandidato)
        } else{
            return Promise.reject("id Candidato not found")
        }
    }
    
    public async deleteCandidatoId(IdCand: string) {
        const deleteById = await CandidatoRepository.delete({IdCand})
        if (deleteById) {
            return Promise.resolve('Deleted IdCand with success')
          } else {
            return Promise.reject('Was not able to delete IdCand')
          }
    }

    public async updateCandidato(IdCand: string, valid: CandidatoDto): Promise<Candidato> {
        try {
            const data = await CandidatoRepository.findOneBy({IdCand})
            if (!data) {
                return Promise.reject('IdCand was not found')
            }
            data.NomeCompleto = valid.NomeCompleto
            data.Email = valid.Email
            data.Telefone = valid.Telefone
            data.CPF = valid.CPF
            data.DataNasc = valid.DataNasc
            data.Endereco = valid.Endereco
            data.Formacao = valid.Formacao
            data.ExpProfissional = valid.ExpProfissional
            data.Senha = valid.Senha
            data.Deficiencia = valid.Deficiencia

            return await CandidatoRepository.save(data)
        } catch (err) {
            return Promise.reject(new Error('Unable to update Candidato'))
        }
    }
}

export default CandidatoServices;