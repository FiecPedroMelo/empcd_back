import { jwtDecode } from "jwt-decode"
import * as jwt from "jsonwebtoken"
import { v4 } from "uuid"
import { EmpresaDto } from "../models/dto/Empresa.dto"
import Empresa from "../models/entities/Empresa"
import EmpresaRepository from "../models/repositories/Empresa.repositories"
import Vaga_auxRepository from "../models/repositories/Vaga_aux.repositories"
import vagaRepository from "../models/repositories/Vaga.repositories"

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
            return await EmpresaRepository.save(data)
        } catch (err) {
            return Promise.reject(new Error('Unable to update Empresa'));
        }
    }

    
}

export default EmpresaServices;
