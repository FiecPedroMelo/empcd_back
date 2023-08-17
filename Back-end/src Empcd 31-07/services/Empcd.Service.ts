import { v4 } from "uuid";
import { EmpcdDto } from "../models/dto/Empcd.dto";
import Empcd from "../models/entities/Empcd";
import empcdRepository from "../models/repositories/Empcd.repositories";

class EmpcdServices {
    private static instance: EmpcdServices
    private constructor() {}
    public static Instance(): EmpcdServices {
        if (!EmpcdServices.instance) {
            EmpcdServices.instance = new EmpcdServices()
        }
        return EmpcdServices.instance
    }

    public async createEmpcdPerfil(valid: Empcd): Promise<Empcd> {
        try {
            const empcd = new Empcd()
            empcd.IdCand = v4()
            empcd.NomeCompleto = valid.NomeCompleto
            empcd.Email = valid.Email
            empcd.Telefone = valid.Telefone
            empcd.CPF = valid.CPF
            empcd.DataNasc = valid.DataNasc
            empcd.Endereco = valid.Endereco
            empcd.Formacao = valid.Formacao
            empcd.ExpProfissional = valid.ExpProfissional
            empcd.Senha = valid.Senha
            empcd.Deficiencia = valid.Deficiencia
            console.log(empcd)

            return await empcdRepository.save(empcd)
        } catch (err) {
            return Promise.reject(new Error('error cannot save Empcd'))
        }
    }
    public async allEmpcd(): Promise<Empcd[]> {
        return await empcdRepository.find()
    }

    public async IdbyEmpcd(IdCand: string): Promise<Empcd> {
        const idempcd = await empcdRepository.findOneBy({IdCand})
        if (idempcd) {
            return Promise.resolve(idempcd)
        } else{
            return Promise.reject("id empcd not found")
        }
    }
    
    public async deleteEmpcdId(IdCand: string) {
        const deleteById = await empcdRepository.delete({IdCand})
        if (deleteById) {
            return Promise.resolve('Deleted IdCand with success')
          } else {
            return Promise.reject('Was not able to delete IdCand')
          }
    }

    public async updateEmpcd(IdCand: string, valid: EmpcdDto): Promise<Empcd> {
        try {
            const data = await empcdRepository.findOneBy({IdCand})
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

            return await empcdRepository.save(data)
        } catch (err) {
            return Promise.reject(new Error('Unable to update Empcd'))
        }
    }
}

export default EmpcdServices;