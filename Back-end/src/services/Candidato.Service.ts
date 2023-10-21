import { v4 } from "uuid";
import { CandidatoDto } from "../models/dto/Candidato.dto";
import Candidato from "../models/entities/Candidato";
import CandidatoRepository from "../models/repositories/Candidato.repositories";
import { Request } from "express";
import Jimp from "jimp";

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
            let CPF = valid.CPF
            let novoCpf = CPF.substring(0, 2) + "." + CPF.substring(3, 5) + "." + CPF.substring(6, 8) + "-" + CPF.substring(9, CPF.length - 1)
            candidato.CPF = novoCpf
            candidato.Telefone = valid.Telefone
            candidato.Senha = valid.Senha
            candidato.Genero = valid.Genero
            candidato.Deficiencia = valid.Deficiencia
            candidato.DataNasc = valid.DataNasc
            candidato.Estado = valid.Estado
            candidato.Cidade = valid.Cidade
            candidato.Bairro = valid.Bairro
            candidato.Formacao = valid.Formacao
            candidato.ExpAnteriores = valid.ExpAnteriores
            candidato.Habilidades = valid.Habilidades
            candidato.ImagemCandidato = valid.ImagemCandidato
            console.log(candidato)

            return await CandidatoRepository.save(candidato)
        } catch (err) {
            return Promise.reject(new Error('Error saving Candidato'))
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
            return Promise.resolve('Deleted IdCand successfully')
          } else {
            return Promise.reject('Was not able to delete IdCand')
          }
    }

    public async updateCandidato(IdCand: string, valid: CandidatoDto): Promise<Candidato> {
        try {
            const data = await CandidatoRepository.findOneBy({IdCand})
            if (!data) {
                return Promise.reject('Could not find IdCandidato')
            }
            data.NomeCompleto
            data.Email
            data.CPF
            data.Telefone
            data.Senha
            data.Genero
            data.Deficiencia
            data.DataNasc
            data.Estado
            data.Cidade
            data.Bairro
            data.Formacao
            data.ExpAnteriores
            data.Habilidades
            data.ImagemCandidato
            return await CandidatoRepository.save(data)
        } catch (err) {
            return Promise.reject(new Error('Unable to update Candidato'))
        }
    }
}

export default CandidatoServices;

function hmacSHA512(hashDigest: CryptoJS.lib.WordArray, privateKey: string): CryptoJS.lib.WordArray {
    throw new Error("Function not implemented.");
}
