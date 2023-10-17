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
    getEmpresaFromData(CNPJ:string, RazaoSocial:string, NomeFantasia:string, Email:string, Senha:string, Cep:string, Endereco:string, ImagemEmpresa:string) : Empresa{
        const newEmpresa = new Empresa();
        newEmpresa.IdEmpresa = v4();
        newEmpresa.CNPJ = CNPJ,
        newEmpresa.NomeFantasia = NomeFantasia,
        newEmpresa.Email = Email,
        newEmpresa.Senha = Senha,
        newEmpresa.Endereco = Endereco,
        newEmpresa.RazaoSocial = RazaoSocial,
        newEmpresa.Cep = Cep,
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

    async signUpEmpresa(CNPJ:string, RazaoSocial:string, NomeFantasia:string, Email:string, Senha:string, Cep:string, Endereco:string, ImagemEmpresa:string) {
        try{
            const newEmpresa = new Empresa();
            newEmpresa.IdEmpresa = v4();
            newEmpresa.CNPJ = CNPJ,
            newEmpresa.NomeFantasia = NomeFantasia,
            newEmpresa.Email = Email,
            newEmpresa.Senha = Senha,
            newEmpresa.Endereco = Endereco,
            newEmpresa.RazaoSocial = RazaoSocial,
            newEmpresa.Cep = Cep,
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
                .on('data', (data) => Empresas.push(this.getEmpresaFromData(data.CNPJ, data.RazaoSocial, data.NomeFantasia, data.Email, data.Senha, data.Cep, data.Endereco, data.ImagemEmpresa)))
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