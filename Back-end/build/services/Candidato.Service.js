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
const uuid_1 = require("uuid");
const Candidato_1 = __importDefault(require("../models/entities/Candidato"));
const Candidato_repositories_1 = __importDefault(require("../models/repositories/Candidato.repositories"));
class CandidatoServices {
    constructor() { }
    static Instance() {
        if (!CandidatoServices.instance) {
            CandidatoServices.instance = new CandidatoServices();
        }
        return CandidatoServices.instance;
    }
    createCandidatoPerfil(valid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidato = new Candidato_1.default();
                candidato.IdCand = (0, uuid_1.v4)();
                candidato.NomeCompleto = valid.NomeCompleto;
                candidato.Email = valid.Email;
                candidato.Telefone = valid.Telefone;
                let CPF = valid.CPF;
                let novoCpf = CPF.substring(0, 2) + "." + CPF.substring(3, 5) + "." + CPF.substring(6, 8) + "-" + CPF.substring(9, CPF.length - 1);
                candidato.CPF = novoCpf;
                candidato.DataNasc = valid.DataNasc;
                candidato.Endereco = valid.Endereco;
                candidato.Formacao = valid.Formacao;
                candidato.ExpProfissional = valid.ExpProfissional;
                candidato.Senha = valid.Senha;
                candidato.Deficiencia = valid.Deficiencia;
                console.log(candidato);
                return yield Candidato_repositories_1.default.save(candidato);
            }
            catch (err) {
                return Promise.reject(new Error('Error saving Candidato'));
            }
        });
    }
    allCandidato() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Candidato_repositories_1.default.find();
        });
    }
    IdbyCandidato(IdCand) {
        return __awaiter(this, void 0, void 0, function* () {
            const idCandidato = yield Candidato_repositories_1.default.findOneBy({ IdCand });
            if (idCandidato) {
                return Promise.resolve(idCandidato);
            }
            else {
                return Promise.reject("id Candidato not found");
            }
        });
    }
    deleteCandidatoId(IdCand) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteById = yield Candidato_repositories_1.default.delete({ IdCand });
            if (deleteById) {
                return Promise.resolve('Deleted IdCand successfully');
            }
            else {
                return Promise.reject('Was not able to delete IdCand');
            }
        });
    }
    updateCandidato(IdCand, valid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Candidato_repositories_1.default.findOneBy({ IdCand });
                if (!data) {
                    return Promise.reject('Could not find IdCandidato');
                }
                data.NomeCompleto = valid.NomeCompleto;
                data.Email = valid.Email;
                data.Telefone = valid.Telefone;
                data.CPF = valid.CPF;
                data.DataNasc = valid.DataNasc;
                data.Endereco = valid.Endereco;
                data.Formacao = valid.Formacao;
                data.ExpProfissional = valid.ExpProfissional;
                data.Senha = valid.Senha;
                data.Deficiencia = valid.Deficiencia;
                return yield Candidato_repositories_1.default.save(data);
            }
            catch (err) {
                return Promise.reject(new Error('Unable to update Candidato'));
            }
        });
    }
}
exports.default = CandidatoServices;
