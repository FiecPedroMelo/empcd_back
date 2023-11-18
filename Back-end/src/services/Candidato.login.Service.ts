import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import { v4 } from "uuid";
import logger from "../config/logger";
import Candidato from "../models/entities/Candidato";
import CandidatoRepository from "../models/repositories/Candidato.repositories";
import { Request } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import * as jwt from 'jsonwebtoken';
import { SECRET } from "../constants";
import Jimp from "jimp";
import { jwtDecode } from "jwt-decode";

class CandidatoLoginService {
    getCandidatoFromData(NomeCompleto: string, Email:string, CPF:string, Telefone:string, Senha: string, Genero: string, Deficiencia: string, DataNasc:Date, Estado:string, Cidade:string, Bairro: string, Formacao:string, ExpAnteriores:string, Habilidades:string, ImagemCandidato:string) : Candidato{
        const newCandidato = new Candidato();
        newCandidato.IdCand = v4();
        newCandidato.NomeCompleto = NomeCompleto;
        newCandidato.Email = Email;
        newCandidato.CPF = CPF;
        newCandidato.Telefone = Telefone;
        newCandidato.Genero = Genero;
        newCandidato.Deficiencia = Deficiencia;
        newCandidato.DataNasc = DataNasc;
        newCandidato.Estado = Estado;
        newCandidato.Cidade = Cidade;
        newCandidato.Bairro = Bairro;
        newCandidato.Formacao = Formacao;
        newCandidato.ExpAnteriores = ExpAnteriores;
        newCandidato.Habilidades = Habilidades;
        const hashDigest = sha256(Senha);
        logger.debug("HashAntes: ", hashDigest)
        const privateKey = "FIEC2023"
        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey ))
        logger.debug("HashDepois: ",hashDigest)
        newCandidato.Senha = hmacDigest;
        return newCandidato;
    }

    async loginCandidato(Email: string, Senha: string) {
        try{
            const hashDigest = sha256(Senha);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "Empcd"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey))
            logger.debug("HashDepois: ",hashDigest)
            const foundCandidato = await CandidatoRepository.findOneBy({Email, Senha: hmacDigest});
            if (foundCandidato) {
                let Token = jwt.sign({idCand: foundCandidato.IdCand, Email: foundCandidato.Email, Senha: foundCandidato.Senha}, SECRET);
                const validation: boolean = true;
                const token = {Token, validation}
                return token
            } else {
                const Token = '';
                const validation: boolean = false;
                const token = {Token, validation}
                return token
            }

        } catch (err) {
            return 'Candidato not found ' + err;
        }
        
    }

    async signUpCandidato(NomeCompleto: string, Email:string, CPF:string, Telefone:string, Senha: string, Genero: string, Deficiencia: string, DataNasc:Date, Estado:string, Cidade:string, Bairro: string, Formacao:string, ExpAnteriores:string, Habilidades:string, ImagemCandidato:string) {
        try{
            const newCandidato = new Candidato();
            newCandidato.IdCand = v4();
            newCandidato.NomeCompleto = NomeCompleto;
            newCandidato.Email = Email;
            newCandidato.CPF = CPF;
            newCandidato.Telefone = Telefone;
            newCandidato.Genero = Genero;
            newCandidato.Deficiencia = Deficiencia;
            newCandidato.DataNasc = DataNasc;
            newCandidato.Estado = Estado;
            newCandidato.Cidade = Cidade;
            newCandidato.Bairro = Bairro;
            newCandidato.Formacao = Formacao;
            newCandidato.ExpAnteriores = ExpAnteriores;
            newCandidato.Habilidades = Habilidades;
            const hashDigest = sha256(Senha);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "Empcd"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey));
            logger.debug("HashDepos: ",hashDigest)
            newCandidato.Senha = hmacDigest;
            await CandidatoRepository.save(newCandidato);
        } catch (err) {
            console.log(err);
            return 'Failed to sign Up' + err;
        }
        
    }

    async GetIdCandidato(Token: string) {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        /*const hashDigest = sha256(Senha);
        logger.debug("HashAntes: ", hashDigest)
        const privateKey = "Empcd"
        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey))
        logger.debug("HashDepois: ",hashDigest)
        const foundCandidato = await CandidatoRepository.findOneBy({Email: Email, Senha: payload.Senha});*/
        if(payload.idCand) {
            const IdCand = payload.idCand
            return IdCand
        } else {
            return new Error("id Candidato not found")
        }
    }

    async signUpCandidatosInBatch(req: Request){
        const file = req.body;
        const Candidatos : Candidato[] = [];
        if(file != null) {
            fs.createReadStream(file.path)
                .pipe(csvParser())
                .on('data', (data) => Candidatos.push(this.getCandidatoFromData(data.NomeCompleto, data.Email, data.CPF, data.Telefone, data.Senha, data.Genero, data.Deficiencia, data.DataNasc, data.Estado, data.Cidade, data.Bairro, data.Formacao, data.ExpAnteriores, data.Habilidades, data.ImagemCandidato)))
                .on('end', () => {
                    console.log(Candidatos);
                    CandidatoRepository.insert(Candidatos);
            });
        }
    }
}

export default CandidatoLoginService
