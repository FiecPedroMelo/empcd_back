import { v4 } from "uuid"
import { EmpresaDto } from "../models/dto/Empresa.dto"
import Empresa from "../models/entities/Empresa"
import EmpresaRepository from "../models/repositories/Empresa.repositories"

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
            console.log(empresa)

            return await EmpresaRepository.save(empresa)
        } catch (err) {
            return Promise.reject(new Error('Error saving empresa'));
        }
    }

    public async allEmpresa(): Promise<Empresa[]> {
        return await EmpresaRepository.find()
    }

    public async IdbyEmpresa(IdEmpresa: string): Promise<Empresa> {
        const idEmpresa = await EmpresaRepository.findOneBy({IdEmpresa})
        if(idEmpresa) {
            return Promise.resolve(idEmpresa)
        } else {
            return Promise.reject("id Empresa not found")
        }
    }

    public async deleteEmpresaId(IdEmpresa: string) {
        const deleteById = await EmpresaRepository.delete({IdEmpresa})
        if (deleteById) {
            return Promise.resolve('Deleted IdEmpresa succesfully')
        } else {
            return Promise.reject(new Error('Unable to delete IdEmpresa'))
        }
    }

    public async updateEmpresa(IdEmpresa: string, valid: EmpresaDto): Promise<Empresa> {
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

            return await EmpresaRepository.save(data)
        } catch (err) {
            return Promise.reject(new Error('Unable to update Empresa'));
        }
    }
}

export default EmpresaServices;