import { v4 } from "uuid";
import { CandidatoDto } from "../models/dto/Candidato.dto";
import Candidato from "../models/entities/Candidato";
import CandidatoRepository from "../models/repositories/Candidato.repositories";
import { Request } from "express";
import Jimp from "jimp";
import sha256 from "crypto-js/sha256";
import logger from "../config/logger";
import Base64 from "crypto-js/enc-base64";
import hmacSHA512 from "crypto-js/hmac-sha512";

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
            const hashDigest = sha256(valid.Senha);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "Empcd"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey))
            logger.debug("HashDepois: ",hashDigest)
            data.Senha = hmacDigest
            data.NomeCompleto = valid.NomeCompleto
            data.Email = valid.Email
            data.CPF = valid.CPF
            data.Telefone = valid.Telefone
            data.Genero = valid.Genero
            data.Deficiencia = valid.Deficiencia
            data.DataNasc = valid.DataNasc
            data.Estado = valid.Estado
            data.Cidade = valid.Cidade
            data.Bairro = valid.Bairro
            data.Formacao = valid.Formacao
            data.ExpAnteriores = valid.ExpAnteriores
            data.Habilidades = valid.Habilidades
            return await CandidatoRepository.save(data)
        } catch (err) {
            return Promise.reject(new Error('Unable to update Candidato'))
        }
    }
}

export default CandidatoServices;

