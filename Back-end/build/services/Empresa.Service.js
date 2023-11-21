"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = require("jwt-decode");
const uuid_1 = require("uuid");
const Empresa_1 = __importDefault(require("../models/entities/Empresa"));
const Empresa_repositories_1 = __importDefault(require("../models/repositories/Empresa.repositories"));
const Vaga_repositories_1 = __importDefault(require("../models/repositories/Vaga.repositories"));
const ExibirRelatorio_dto_1 = require("../models/dto/ExibirRelatorio.dto");
const Vaga_aux_1 = __importDefault(require("../models/entities/Vaga_aux"));
const data_source_1 = require("../data-source");
const Candidato_repositories_1 = __importDefault(require("../models/repositories/Candidato.repositories"));
class EmpresaServices {
    constructor() { }
    static Instance() {
        if (!EmpresaServices.instance) {
            EmpresaServices.instance = new EmpresaServices();
        }
        return EmpresaServices.instance;
    }
    createEmpresaPerfil(valid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empresa = new Empresa_1.default();
                empresa.IdEmpresa = (0, uuid_1.v4)();
                empresa.RazaoSocial = valid.RazaoSocial;
                empresa.NomeFantasia = valid.NomeFantasia;
                empresa.Email = valid.Email;
                empresa.Site = valid.Site;
                empresa.Senha = valid.Senha;
                empresa.CNPJ = valid.CNPJ;
                empresa.Cidade = valid.Cidade;
                empresa.Bairro = valid.Bairro;
                empresa.UF = valid.UF;
                empresa.Descricao = valid.Descricao;
                console.log(empresa);
                return yield Empresa_repositories_1.default.save(empresa);
            }
            catch (err) {
                return Promise.reject(new Error('Error saving empresa'));
            }
        });
    }
    allEmpresa() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Empresa_repositories_1.default.find();
        });
    }
    EmpresaById(Token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = (0, jwt_decode_1.jwtDecode)(Token);
            const IdEmpresa = payload.idEmpresa;
            const empresa = yield Empresa_repositories_1.default.findOneBy({ IdEmpresa });
            if (empresa) {
                return Promise.resolve(empresa);
            }
            else {
                return Promise.reject("id Empresa not found");
            }
        });
    }
    deleteEmpresaId(Token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = (0, jwt_decode_1.jwtDecode)(Token);
            const IdEmpresa = payload.idEmpresa;
            const deleteEmpresa = yield Empresa_repositories_1.default.delete(IdEmpresa);
            if (!deleteEmpresa) {
                return Promise.reject(new Error('Unable to delete IdEmpresa'));
            }
            return Promise.resolve('Deleted IdEmpresa succesfully');
        });
    }
    updateEmpresa(Token, valid) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = (0, jwt_decode_1.jwtDecode)(Token);
            const IdEmpresa = payload.idEmpresa;
            try {
                const data = yield Empresa_repositories_1.default.findOneBy({ IdEmpresa });
                if (!data) {
                    return Promise.reject('Could not find IdEmpresa');
                }
                data.RazaoSocial = valid.RazaoSocial;
                data.NomeFantasia = valid.NomeFantasia;
                data.Email = valid.Email;
                data.Site = valid.Site;
                data.Senha = valid.Senha;
                data.CNPJ = valid.CNPJ;
                data.Cidade = valid.Cidade;
                data.Bairro = valid.Bairro;
                data.UF = valid.UF;
                data.Descricao = valid.Descricao;
                return yield Empresa_repositories_1.default.save(data);
            }
            catch (err) {
                return Promise.reject(new Error('Unable to update Empresa'));
            }
        });
    }
    /*public async getRelatorio (Token:string, idVaga:string): Promise<ExibirRelatorioDto[]> {
    let vaga_aux = await AppDataSource.getRepository(Vaga_aux)
    .createQueryBuilder('vaga_aux')
    .leftJoinAndSelect('vaga_aux.candidato', 'candidato')
    .where('vaga_aux.IdVaga = :idVaga', {idVaga: idVaga.toString()})
    .andWhere('vaga_aux.IdCand = candidato.IdCand')
    .getOne();
    if(!vaga_aux){
        return Promise.reject(new Error('sim'))
    }
    let exibirRelatorio = new ExibirRelatorioDto();
    exibirRelatorio.NomeCompleto = vaga_aux.candidato.NomeCompleto;
    exibirRelatorio.Email = vaga_aux.candidato.Email;
    exibirRelatorio.Telefone = vaga_aux.candidato.Telefone;
    return Promise.resolve(exibirRelatorio)
}*/
    getRelatorio(Token, idVaga) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = (0, jwt_decode_1.jwtDecode)(Token);
            const idEmpresa = payload.idEmpresa;
            let relatorios = [];
            try {
                const vaga = yield Vaga_repositories_1.default.findOneBy({ IdVaga: idVaga });
                if (!vaga) {
                    return Promise.reject(new Error('Unable to find vaga'));
                }
                let vagaAux = yield data_source_1.AppDataSource.getRepository(Vaga_aux_1.default)
                    .createQueryBuilder('vaga_aux')
                    .leftJoinAndSelect('vaga_aux.vagas', 'vagas')
                    .leftJoinAndSelect('vaga_aux.candidato', 'candidato')
                    .where('vaga_aux.vagas = :Vaga', { Vaga: idVaga })
                    .getMany();
                let newVagaAux = [];
                vagaAux.forEach(vagaaux => {
                    if (vagaaux.vagas.IdVaga == vaga.IdVaga) {
                        newVagaAux.push(vagaaux);
                    }
                });
                newVagaAux.forEach(vagaAux => {
                    let candidato = vagaAux.candidato;
                    let relatorio = new ExibirRelatorio_dto_1.ExibirRelatorioDto();
                    relatorio.IdCand = candidato.IdCand;
                    relatorio.NomeCompleto = candidato.NomeCompleto;
                    relatorio.Email = candidato.Email;
                    relatorio.Telefone = candidato.Telefone;
                    relatorios.push(relatorio);
                });
            }
            catch (err) {
                console.log(err);
            }
            return Promise.resolve(relatorios);
        });
    }
    IdbyCandidato(IdCand) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidato = yield Candidato_repositories_1.default.findOneBy({ IdCand: IdCand });
            if (candidato) {
                return Promise.resolve(candidato);
            }
            else {
                return Promise.reject("id Candidato not found");
            }
        });
    }
}
exports.default = EmpresaServices;
