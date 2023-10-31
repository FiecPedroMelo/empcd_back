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
const sha256_1 = __importDefault(require("crypto-js/sha256"));
const logger_1 = __importDefault(require("../config/logger"));
const enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
const hmac_sha512_1 = __importDefault(require("crypto-js/hmac-sha512"));
const jwt_decode_1 = require("jwt-decode");
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
                let CPF = valid.CPF;
                let novoCpf = CPF.substring(0, 2) + "." + CPF.substring(3, 5) + "." + CPF.substring(6, 8) + "-" + CPF.substring(9, CPF.length - 1);
                candidato.CPF = novoCpf;
                candidato.Telefone = valid.Telefone;
                candidato.Senha = valid.Senha;
                candidato.Genero = valid.Genero;
                candidato.Deficiencia = valid.Deficiencia;
                candidato.DataNasc = valid.DataNasc;
                candidato.Estado = valid.Estado;
                candidato.Cidade = valid.Cidade;
                candidato.Bairro = valid.Bairro;
                candidato.Formacao = valid.Formacao;
                candidato.ExpAnteriores = valid.ExpAnteriores;
                candidato.Habilidades = valid.Habilidades;
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
    IdbyCandidato(Token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = (0, jwt_decode_1.jwtDecode)(Token);
            const IdCandidato = payload.IdCand;
            const candidato = yield Candidato_repositories_1.default.findOneBy({ IdCand: IdCandidato });
            if (candidato) {
                return Promise.resolve(candidato);
            }
            else {
                return Promise.reject("id Candidato not found");
            }
        });
    }
    deleteCandidatoId(Token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = (0, jwt_decode_1.jwtDecode)(Token);
            const IdCandidato = payload.idCand;
            const deleteById = yield Candidato_repositories_1.default.delete({ IdCand: IdCandidato });
            if (deleteById) {
                return Promise.resolve('Deleted IdCand successfully');
            }
            else {
                return Promise.reject('Was not able to delete IdCand');
            }
        });
    }
    updateCandidato(Token, valid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = (0, jwt_decode_1.jwtDecode)(Token);
                const IdCandidato = payload.IdCand;
                const data = yield Candidato_repositories_1.default.findOneBy({ IdCand: IdCandidato });
                if (!data) {
                    return Promise.reject('Could not find IdCandidato');
                }
                const hashDigest = (0, sha256_1.default)(valid.Senha);
                logger_1.default.debug("HashAntes: ", hashDigest);
                const privateKey = "Empcd";
                const hmacDigest = enc_base64_1.default.stringify((0, hmac_sha512_1.default)(hashDigest, privateKey));
                logger_1.default.debug("HashDepois: ", hashDigest);
                data.Senha = hmacDigest;
                data.NomeCompleto = valid.NomeCompleto;
                data.Email = valid.Email;
                data.CPF = valid.CPF;
                data.Telefone = valid.Telefone;
                data.Genero = valid.Genero;
                data.Deficiencia = valid.Deficiencia;
                data.DataNasc = valid.DataNasc;
                data.Estado = valid.Estado;
                data.Cidade = valid.Cidade;
                data.Bairro = valid.Bairro;
                data.Formacao = valid.Formacao;
                data.ExpAnteriores = valid.ExpAnteriores;
                data.Habilidades = valid.Habilidades;
                return yield Candidato_repositories_1.default.save(data);
            }
            catch (err) {
                return Promise.reject(new Error('Unable to update Candidato'));
            }
        });
    }
}
exports.default = CandidatoServices;
