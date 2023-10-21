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
                vaga.IdEmpresa = valid.IdEmpresa;
                vaga.TituloCargo = valid.TituloCargo;
                vaga.Localizacao = valid.Localizacao;
                vaga.DataPostagem = valid.DataPostagem;
                vaga.Requisitos = valid.Requisitos;
                vaga.Descricao = valid.Descricao;
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
                data.DataPostagem = valid.DataPostagem;
                data.Requisitos = valid.Requisitos;
                data.Descricao = valid.Descricao;
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
                console.log(vaga);
                const candidato = yield Candidato_repositories_1.default.findOneBy({ IdCand });
                console.log(candidato);
                if (!vaga) {
                    return Promise.reject(new Error('Could not find Vaga'));
                }
                if (!candidato) {
                    return Promise.reject(new Error('Could not find Candidato'));
                }
                if (!vaga.candidatos)
                    vaga.candidatos = [];
                vaga === null || vaga === void 0 ? void 0 : vaga.candidatos.push(candidato);
                return yield Vaga_repositories_1.default.save(vaga);
            }
            catch (err) {
                console.log(err);
                return Promise.reject(new Error('Unable to update Vaga'));
            }
        });
    }
}
exports.default = VagaServices;
