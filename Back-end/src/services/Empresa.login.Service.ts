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
import Jimp from "jimp";

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
        ImagemEmpresa: string) : Empresa{
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
        newEmpresa.ImagemEmpresa = ImagemEmpresa
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
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey ))
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
        ImagemEmpresa: string) {
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
            newEmpresa.ImagemEmpresa = ImagemEmpresa
            const hashDigest = sha256(Senha);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "Empcd"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey));
            logger.debug("HashDepos: ",hashDigest)
            newEmpresa.Senha = hmacDigest;
            await EmpresaRepository.save(newEmpresa);
        } catch (err) {
            console.log(err);
            return 'Failed to sign Up' + err;
        }
        
    }

    async signUpEmpresasInBatch(req: Request){
        const file = req.body;
        const Empresas : Empresa[] = [];
        if(file != null) {
            fs.createReadStream(file.path)
                .pipe(csvParser())
                .on('data', (data) => Empresas.push(this.getEmpresaFromData(data.RazaoSocial, data.NomeFantasia, data.Email, data.Site, data.Senha, data.CNPJ, data.Cidade, data.Bairro, data.UF, data.ImagemEmpresa)))
                .on('end', () => {
                    console.log(Empresas);
                    EmpresaRepository.insert(Empresas);
            });
        }
    }
    async updateEmpresaImage(req: Request){
        const file = req.file;
        const {id} = (req as any).authUser;
        const foundEmpresa = await EmpresaRepository.findOneBy({IdEmpresa: id});
        if(file != null && foundEmpresa != null){
            const image = await Jimp.read(file.path);
            await image.resize(600,600);
            await image.writeAsync('uploads/' + file.originalname);
            foundEmpresa.ImagemEmpresa = file.originalname;
            await EmpresaRepository.save(foundEmpresa)
        }
    }
}

export default EmpresaLoginService