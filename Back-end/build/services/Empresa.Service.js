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
const Empresa_1 = __importDefault(require("../models/entities/Empresa"));
const Empresa_repositories_1 = __importDefault(require("../models/repositories/Empresa.repositories"));
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
                empresa.CNPJ = valid.CNPJ;
                empresa.RazaoSocial = valid.RazaoSocial;
                empresa.NomeFantasia = valid.NomeFantasia;
                empresa.Email = valid.Email;
                empresa.Senha = valid.Senha;
                empresa.Cep = valid.Cep;
                empresa.Endereco = valid.Endereco;
                empresa.ImagemEmpresa = valid.ImagemEmpresa;
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
    IdbyEmpresa(IdEmpresa) {
        return __awaiter(this, void 0, void 0, function* () {
            const idEmpresa = yield Empresa_repositories_1.default.findOneBy({ IdEmpresa });
            if (idEmpresa) {
                return Promise.resolve(idEmpresa);
            }
            else {
                return Promise.reject("id Empresa not found");
            }
        });
    }
    deleteEmpresaId(IdEmpresa) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteById = yield Empresa_repositories_1.default.delete({ IdEmpresa });
            if (deleteById) {
                return Promise.resolve('Deleted IdEmpresa succesfully');
            }
            else {
                return Promise.reject(new Error('Unable to delete IdEmpresa'));
            }
        });
    }
    updateEmpresa(IdEmpresa, valid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Empresa_repositories_1.default.findOneBy({ IdEmpresa });
                if (!data) {
                    return Promise.reject('Could not find IdEmpresa');
                }
                data.CNPJ = valid.CNPJ;
                data.RazaoSocial = valid.RazaoSocial;
                data.NomeFantasia = valid.NomeFantasia;
                data.Email = valid.Email;
                data.Senha = valid.Senha;
                data.Cep = valid.Cep;
                data.Endereco = valid.Endereco;
                data.ImagemEmpresa = valid.ImagemEmpresa;
                return yield Empresa_repositories_1.default.save(data);
            }
            catch (err) {
                return Promise.reject(new Error('Unable to update Empresa'));
            }
        });
    }
}
exports.default = EmpresaServices;
