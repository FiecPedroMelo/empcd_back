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
const Vagas_1 = __importDefault(require("../models/entities/Vagas"));
const Candidato_repositories_1 = __importDefault(require("../models/repositories/Candidato.repositories"));
const Vaga_repositories_1 = __importDefault(require("../models/repositories/Vaga.repositories"));
const Empresa_repositories_1 = __importDefault(require("../models/repositories/Empresa.repositories"));
const VagaPorEmpresa_dto_1 = require("../models/dto/VagaPorEmpresa.dto");
const Vaga_aux_1 = require("../models/entities/Vaga_aux");
const Vaga_aux_repositories_1 = __importDefault(require("../models/repositories/Vaga_aux.repositories"));
class VagaServices {
    constructor() { }
    static Instance() {
        if (!VagaServices.instance) {
            VagaServices.instance = new VagaServices();
        }
        return VagaServices.instance;
    }
    createVaga(valid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vaga = new Vagas_1.default();
                vaga.IdVaga = (0, uuid_1.v4)();
                const empresa = yield Empresa_repositories_1.default.findOneBy({ IdEmpresa: valid.IdEmpresa });
                if (empresa == null)
                    throw new Error(`No empresa found`);
                vaga.empresa = empresa;
                vaga.TituloCargo = valid.TituloCargo;
                vaga.Localizacao = valid.Localizacao;
                vaga.Requisitos = valid.Requisitos;
                vaga.DescricaoVaga = valid.DescricaoVaga;
                vaga.Status = valid.Status;
                return yield Vaga_repositories_1.default.save(vaga);
            }
            catch (err) {
                return Promise.reject(new Error('Error saving vaga'));
            }
        });
    }
    updateVaga(IdVaga, valid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Vaga_repositories_1.default.findOneBy({ IdVaga });
                if (!data) {
                    return Promise.reject(new Error('Could not find IdVaga'));
                }
                data.TituloCargo = valid.TituloCargo;
                data.Localizacao = valid.Localizacao;
                data.Requisitos = valid.Requisitos;
                data.DescricaoVaga = valid.DescricaoVaga;
                return yield Vaga_repositories_1.default.save(data);
            }
            catch (err) {
                return Promise.reject(new Error('Unable to update Vaga'));
            }
        });
    }
    getVaga() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Vaga_repositories_1.default.find();
        });
    }
    getVagaById(IdVaga) {
        return __awaiter(this, void 0, void 0, function* () {
            const vaga = yield Vaga_repositories_1.default.findOneBy({ IdVaga });
            if (!vaga) {
                return Promise.reject(new Error('Unable to find Vaga'));
            }
            return Promise.resolve(vaga);
        });
    }
    candidataVaga(IdVaga, IdCand) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(IdVaga, IdCand);
            try {
                const vaga = yield Vaga_repositories_1.default.findOneBy({ IdVaga });
                const candidato = yield Candidato_repositories_1.default.findOneBy({ IdCand });
                if (!vaga) {
                    return Promise.reject(new Error('Could not find Vaga'));
                }
                if (!candidato) {
                    return Promise.reject(new Error('Could not find Candidato'));
                }
                if (!vaga.Status) {
                    return Promise.reject(new Error('Vaga is already closed'));
                }
                const empresa = yield Empresa_repositories_1.default.findOneBy(vaga.empresa);
                if (!empresa) {
                    return Promise.reject(new Error('Could not find Empresa'));
                }
                const vaga_aux = new Vaga_aux_1.Vaga_aux();
                vaga_aux.IdVagaAux = (0, uuid_1.v4)();
                vaga_aux.empresa = empresa;
                vaga_aux.vagas = vaga;
                vaga_aux.candidato = candidato;
                return yield Vaga_aux_repositories_1.default.save(vaga_aux);
            }
            catch (err) {
                console.log(err);
                return Promise.reject(new Error('Unable to update Vaga'));
            }
        });
    }
    vagaSearcherEmpresa(NomeFantasia) {
        return __awaiter(this, void 0, void 0, function* () {
            let vagas = [];
            const empresa = yield Empresa_repositories_1.default.findOneBy({ NomeFantasia });
            try {
                if (empresa) {
                    const vagasPorEmpresa = yield Vaga_repositories_1.default.findBy({ empresa: empresa });
                    vagasPorEmpresa.forEach(vagaPorEmpresa => {
                        const vagaResponse = new VagaPorEmpresa_dto_1.VagaPorEmpresaDto();
                        vagaResponse.ImagemEmpresa = vagaPorEmpresa.empresa.ImagemEmpresa;
                        vagaResponse.NomeFantasia = vagaPorEmpresa.empresa.NomeFantasia;
                        vagaResponse.TituloCargo = vagaPorEmpresa.TituloCargo;
                        vagaResponse.DescricaoVaga = vagaPorEmpresa.DescricaoVaga;
                        vagas.push(vagaResponse);
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
            return Promise.resolve(vagas);
        });
    }
    vagaSearcherCandidato() {
        return __awaiter(this, void 0, void 0, function* () {
            let vagas = [];
            try {
                const TodasVagas = yield Vaga_repositories_1.default.find();
                TodasVagas.forEach(vaga => {
                    const vagaResponse = new VagaPorEmpresa_dto_1.VagaPorEmpresaDto();
                    vagaResponse.ImagemEmpresa = vaga.empresa.ImagemEmpresa;
                    vagaResponse.NomeFantasia = vaga.empresa.NomeFantasia;
                    vagaResponse.TituloCargo = vaga.TituloCargo;
                    vagaResponse.DescricaoVaga = vaga.DescricaoVaga;
                    vagas.push(vagaResponse);
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = VagaServices;
