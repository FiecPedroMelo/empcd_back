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
const Empcd_1 = __importDefault(require("../models/entities/Empcd"));
const Empcd_repositories_1 = __importDefault(require("../models/repositories/Empcd.repositories"));
class EmpcdServices {
    constructor() { }
    static Instance() {
        if (!EmpcdServices.instance) {
            EmpcdServices.instance = new EmpcdServices();
        }
        return EmpcdServices.instance;
    }
    createEmpcdPerfil(valid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empcd = new Empcd_1.default();
                empcd.IdCand = (0, uuid_1.v4)();
                empcd.NomeCompleto = valid.NomeCompleto;
                empcd.Email = valid.Email;
                empcd.Telefone = valid.Telefone;
                empcd.CPF = valid.CPF;
                empcd.DataNasc = valid.DataNasc;
                empcd.Endereco = valid.Endereco;
                empcd.Formacao = valid.Formacao;
                empcd.ExpProfissional = valid.ExpProfissional;
                empcd.Senha = valid.Senha;
                empcd.Deficiencia = valid.Deficiencia;
                console.log(empcd);
                return yield Empcd_repositories_1.default.save(empcd);
            }
            catch (err) {
                return Promise.reject(new Error('error cannot save Empcd'));
            }
        });
    }
    allEmpcd() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Empcd_repositories_1.default.find();
        });
    }
    IdbyEmpcd(IdCand) {
        return __awaiter(this, void 0, void 0, function* () {
            const idempcd = yield Empcd_repositories_1.default.findOneBy({ IdCand });
            if (idempcd) {
                return Promise.resolve(idempcd);
            }
            else {
                return Promise.reject("id empcd not found");
            }
        });
    }
    deleteEmpcdId(IdCand) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteById = yield Empcd_repositories_1.default.delete({ IdCand });
            if (deleteById) {
                return Promise.resolve('Deleted IdCand with success');
            }
            else {
                return Promise.reject('Was not able to delete IdCand');
            }
        });
    }
    updateEmpcd(IdCand, valid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Empcd_repositories_1.default.findOneBy({ IdCand });
                if (!data) {
                    return Promise.reject('IdCand was not found');
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
                return yield Empcd_repositories_1.default.save(data);
            }
            catch (err) {
                return Promise.reject(new Error('Unable to update Empcd'));
            }
        });
    }
}
exports.default = EmpcdServices;
