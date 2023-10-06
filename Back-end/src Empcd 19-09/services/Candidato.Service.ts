import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";
import { v4 } from "uuid";
import logger from "../config/logger";
import { CandidatoDto } from "../models/dto/Candidato.dto";
import Candidato from "../models/entities/Candidato";
import CandidatoRepository from "../models/repositories/Candidato.repositories";
import { Request } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import * as jwt from 'jsonwebtoken';
import { SECRET } from "../constants";

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
            let CPF = valid.CPF
            let novoCpf = CPF.substring(0, 2) + "." + CPF.substring(3, 5) + "." + CPF.substring(6, 8) + "-" + CPF.substring(9, CPF.length - 1)
            candidato.CPF = novoCpf
            candidato.DataNasc = valid.DataNasc
            candidato.Endereco = valid.Endereco
            candidato.Formacao = valid.Formacao
            candidato.ExpProfissional = valid.ExpProfissional
            candidato.Senha = valid.Senha
            candidato.Deficiencia = valid.Deficiencia
            candidato.Cep = valid.Cep
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
            data.Cep = valid.Cep

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
