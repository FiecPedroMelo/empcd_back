"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
const sha256_1 = __importDefault(require("crypto-js/sha256"));
const hmac_sha512_1 = __importDefault(require("crypto-js/hmac-sha512"));
const uuid_1 = require("uuid");
const logger_1 = __importDefault(require("../config/logger"));
const Candidato_1 = __importDefault(require("../models/entities/Candidato"));
const Candidato_repositories_1 = __importDefault(require("../models/repositories/Candidato.repositories"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = require("../constants");
const jwt_decode_1 = require("jwt-decode");
class CandidatoLoginService {
    getCandidatoFromData(NomeCompleto, Email, CPF, Telefone, Senha, Genero, Deficiencia, DataNasc, Estado, Cidade, Bairro, Formacao, ExpAnteriores, Habilidades, ImagemCandidato) {
        const newCandidato = new Candidato_1.default();
        newCandidato.IdCand = (0, uuid_1.v4)();
        newCandidato.NomeCompleto = NomeCompleto;
        newCandidato.Email = Email;
        newCandidato.CPF = CPF;
        newCandidato.Telefone = Telefone;
        newCandidato.Genero = Genero;
        newCandidato.Deficiencia = Deficiencia;
        newCandidato.DataNasc = DataNasc;
        newCandidato.Estado = Estado;
        newCandidato.Cidade = Cidade;
        newCandidato.Bairro = Bairro;
        newCandidato.Formacao = Formacao;
        newCandidato.ExpAnteriores = ExpAnteriores;
        newCandidato.Habilidades = Habilidades;
        const hashDigest = (0, sha256_1.default)(Senha);
        logger_1.default.debug("HashAntes: ", hashDigest);
        const privateKey = "FIEC2023";
        const hmacDigest = enc_base64_1.default.stringify((0, hmac_sha512_1.default)(hashDigest, privateKey));
        logger_1.default.debug("HashDepois: ", hashDigest);
        newCandidato.Senha = hmacDigest;
        return newCandidato;
    }
    loginCandidato(Email, Senha) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashDigest = (0, sha256_1.default)(Senha);
                logger_1.default.debug("HashAntes: ", hashDigest);
                const privateKey = "Empcd";
                const hmacDigest = enc_base64_1.default.stringify((0, hmac_sha512_1.default)(hashDigest, privateKey));
                logger_1.default.debug("HashDepois: ", hashDigest);
                const foundCandidato = yield Candidato_repositories_1.default.findOneBy({ Email, Senha: hmacDigest });
                if (foundCandidato) {
                    let Token = jwt.sign({ idCand: foundCandidato.IdCand, Email: foundCandidato.Email, Senha: foundCandidato.Senha }, constants_1.SECRET);
                    const validation = true;
                    const token = { Token, validation };
                    return token;
                }
                else {
                    const Token = '';
                    const validation = false;
                    const token = { Token, validation };
                    return token;
                }
            }
            catch (err) {
                return 'Candidato not found ' + err;
            }
        });
    }
    signUpCandidato(NomeCompleto, Email, CPF, Telefone, Senha, Genero, Deficiencia, DataNasc, Estado, Cidade, Bairro, Formacao, ExpAnteriores, Habilidades, ImagemCandidato) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCandidato = new Candidato_1.default();
                newCandidato.IdCand = (0, uuid_1.v4)();
                newCandidato.NomeCompleto = NomeCompleto;
                newCandidato.Email = Email;
                newCandidato.CPF = CPF;
                newCandidato.Telefone = Telefone;
                newCandidato.Genero = Genero;
                newCandidato.Deficiencia = Deficiencia;
                newCandidato.DataNasc = DataNasc;
                newCandidato.Estado = Estado;
                newCandidato.Cidade = Cidade;
                newCandidato.Bairro = Bairro;
                newCandidato.Formacao = Formacao;
                newCandidato.ExpAnteriores = ExpAnteriores;
                newCandidato.Habilidades = Habilidades;
                const hashDigest = (0, sha256_1.default)(Senha);
                logger_1.default.debug("HashAntes: ", hashDigest);
                const privateKey = "Empcd";
                const hmacDigest = enc_base64_1.default.stringify((0, hmac_sha512_1.default)(hashDigest, privateKey));
                logger_1.default.debug("HashDepos: ", hashDigest);
                newCandidato.Senha = hmacDigest;
                yield Candidato_repositories_1.default.save(newCandidato);
            }
            catch (err) {
                console.log(err);
                return 'Failed to sign Up' + err;
            }
        });
    }
    GetIdCandidato(Token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = (0, jwt_decode_1.jwtDecode)(Token);
            /*const hashDigest = sha256(Senha);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "Empcd"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey))
            logger.debug("HashDepois: ",hashDigest)
            const foundCandidato = await CandidatoRepository.findOneBy({Email: Email, Senha: payload.Senha});*/
            if (payload.idCand) {
                const IdCand = payload.idCand;
                return IdCand;
            }
            else {
                return new Error("id Candidato not found");
            }
        });
    }
    signUpCandidatosInBatch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.body;
            const Candidatos = [];
            if (file != null) {
                fs_1.default.createReadStream(file.path)
                    .pipe((0, csv_parser_1.default)())
                    .on('data', (data) => Candidatos.push(this.getCandidatoFromData(data.NomeCompleto, data.Email, data.CPF, data.Telefone, data.Senha, data.Genero, data.Deficiencia, data.DataNasc, data.Estado, data.Cidade, data.Bairro, data.Formacao, data.ExpAnteriores, data.Habilidades, data.ImagemCandidato)))
                    .on('end', () => {
                    console.log(Candidatos);
                    Candidato_repositories_1.default.insert(Candidatos);
                });
            }
        });
    }
}
exports.default = CandidatoLoginService;
