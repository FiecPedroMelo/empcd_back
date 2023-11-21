import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import { v4 } from "uuid";
import logger from "../config/logger";
import Empresa from "../models/entities/Empresa";
import EmpresaRepository from "../models/repositories/Empresa.repositories";
import { Request } from "express";
import csvParser from "csv-parser";
import fs from "fs";
import * as jwt from 'jsonwebtoken';
import { SECRET } from "../constants";
import { jwtDecode } from "jwt-decode";


class EmpresaLoginService {
    getEmpresaFromData(
        RazaoSocial: string,
        NomeFantasia: string,
        Email: string,
        Site: string,
        Senha: string,
        CNPJ: string,
        Cidade: string,
        Bairro: string,
        UF: string,
        Descricao: string) : Empresa{
        const newEmpresa = new Empresa();
        newEmpresa.IdEmpresa = v4();
        newEmpresa.RazaoSocial = RazaoSocial,
        newEmpresa.NomeFantasia = NomeFantasia,
        newEmpresa.Email = Email,
        newEmpresa.Site = Site,
        newEmpresa.CNPJ = CNPJ,
        newEmpresa.Cidade = Cidade,
        newEmpresa.Bairro = Bairro,
        newEmpresa.UF = UF
        newEmpresa.Descricao = Descricao
        const hashDigest = sha256(Senha);
        logger.debug("HashAntes: ", hashDigest)
        const privateKey = "FIEC2023"
        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey ))
        logger.debug("HashDepois: ",hashDigest)
        newEmpresa.Senha = hmacDigest;
        return newEmpresa;
    }

    async loginEmpresa(Email: string, Senha: string) {
        try{
            const hashDigest = sha256(Senha);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "Empcd"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey))
            logger.debug("HashDepois: ",hashDigest)
            const foundEmpresa = await EmpresaRepository.findOneBy({Email, Senha: hmacDigest});
            if (foundEmpresa) {
                const token = jwt.sign({idEmpresa: foundEmpresa.IdEmpresa, Email: foundEmpresa.Email, Senha: foundEmpresa.Senha}, SECRET);
                const validation: boolean = true;
                return {token, validation}
            } else {
                const token = '';
                const validation: boolean = false;
                return {token, validation}
            }

        } catch (err) {
            return 'Empresa not found' + err;
        }
        
    }

    async signUpEmpresa(
        RazaoSocial: string,
        NomeFantasia: string,
        Email: string,
        Site: string,
        Senha: string,
        CNPJ: string,
        Cidade: string,
        Bairro: string,
        UF: string,
        Descricao: string) {
        try{
            const newEmpresa = new Empresa();
            newEmpresa.IdEmpresa = v4();
            newEmpresa.RazaoSocial = RazaoSocial,
            newEmpresa.NomeFantasia = NomeFantasia,
            newEmpresa.Email = Email,
            newEmpresa.Site = Site,
            newEmpresa.CNPJ = CNPJ,
            newEmpresa.Cidade = Cidade,
            newEmpresa.Bairro = Bairro,
            newEmpresa.UF = UF,
            newEmpresa.Descricao = Descricao
            const hashDigest = sha256(Senha);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "Empcd"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey));
            logger.debug("HashDepois: ",hashDigest)
            newEmpresa.Senha = hmacDigest;
            await EmpresaRepository.save(newEmpresa);
        } catch (err) {
            console.log(err);
            return 'Failed to sign Up' + err;
        }
        
    }

    async GetIdEmpresa(Token: string) {
        const payload = jwtDecode(Token) as jwt.JwtPayload
        if(!payload) {
            return new Error(`Invalid Empresa`);
        }
        /*const hashDigest = sha256(payload.Senha);
        logger.debug("HashAntes: ", hashDigest)
        const privateKey = "Empcd"
        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey))
        logger.debug("HashDepois: ",hashDigest)
        const foundEmpresa = await EmpresaRepository.findOneBy({Email: payload.Email, Senha: hmacDigest});
        if(foundEmpresa) {
            const IdEmpresa = foundEmpresa.IdEmpresa
            return IdEmpresa
        } else {
            return new Error("id Empresa not found")
        }*/
        if(payload.idEmpresa){
            const idEmpresa = payload.idEmpresa
            return idEmpresa
        } else {
            return new Error("id Empresa not found")
        }
    } //ok - conferir hash no front

    async signUpEmpresasInBatch(req: Request){
        const file = req.body;
        const Empresas : Empresa[] = [];
        if(file != null) {
            fs.createReadStream(file.path)
                .pipe(csvParser())
                .on('data', (data) => Empresas.push(this.getEmpresaFromData(data.RazaoSocial, data.NomeFantasia, data.Email, data.Site, data.Senha, data.CNPJ, data.Cidade, data.Bairro, data.UF, data.Descricao)))
                .on('end', () => {
                    console.log(Empresas);
                    EmpresaRepository.insert(Empresas);
            });
        }
    }
}

export default EmpresaLoginService