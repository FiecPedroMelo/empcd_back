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
const Empresa_1 = __importDefault(require("../models/entities/Empresa"));
const Empresa_repositories_1 = __importDefault(require("../models/repositories/Empresa.repositories"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = require("../constants");
const jwt_decode_1 = require("jwt-decode");
class EmpresaLoginService {
    getEmpresaFromData(RazaoSocial, NomeFantasia, Email, Site, Senha, CNPJ, Cidade, Bairro, UF, Descricao) {
        const newEmpresa = new Empresa_1.default();
        newEmpresa.IdEmpresa = (0, uuid_1.v4)();
        newEmpresa.RazaoSocial = RazaoSocial,
            newEmpresa.NomeFantasia = NomeFantasia,
            newEmpresa.Email = Email,
            newEmpresa.Site = Site,
            newEmpresa.CNPJ = CNPJ,
            newEmpresa.Cidade = Cidade,
            newEmpresa.Bairro = Bairro,
            newEmpresa.UF = UF;
        newEmpresa.Descricao = Descricao;
        const hashDigest = (0, sha256_1.default)(Senha);
        logger_1.default.debug("HashAntes: ", hashDigest);
        const privateKey = "FIEC2023";
        const hmacDigest = enc_base64_1.default.stringify((0, hmac_sha512_1.default)(hashDigest, privateKey));
        logger_1.default.debug("HashDepois: ", hashDigest);
        newEmpresa.Senha = hmacDigest;
        return newEmpresa;
    }
    loginEmpresa(Email, Senha) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashDigest = (0, sha256_1.default)(Senha);
                logger_1.default.debug("HashAntes: ", hashDigest);
                const privateKey = "Empcd";
                const hmacDigest = enc_base64_1.default.stringify((0, hmac_sha512_1.default)(hashDigest, privateKey));
                logger_1.default.debug("HashDepois: ", hashDigest);
                const foundEmpresa = yield Empresa_repositories_1.default.findOneBy({ Email, Senha: hmacDigest });
                if (foundEmpresa) {
                    const token = jwt.sign({ idEmpresa: foundEmpresa.IdEmpresa, Email: foundEmpresa.Email, Senha: foundEmpresa.Senha }, constants_1.SECRET);
                    const validation = true;
                    return { token, validation };
                }
                else {
                    const token = '';
                    const validation = false;
                    return { token, validation };
                }
            }
            catch (err) {
                return 'Empresa not found' + err;
            }
        });
    }
    signUpEmpresa(RazaoSocial, NomeFantasia, Email, Site, Senha, CNPJ, Cidade, Bairro, UF, Descricao) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newEmpresa = new Empresa_1.default();
                newEmpresa.IdEmpresa = (0, uuid_1.v4)();
                newEmpresa.RazaoSocial = RazaoSocial,
                    newEmpresa.NomeFantasia = NomeFantasia,
                    newEmpresa.Email = Email,
                    newEmpresa.Site = Site,
                    newEmpresa.CNPJ = CNPJ,
                    newEmpresa.Cidade = Cidade,
                    newEmpresa.Bairro = Bairro,
                    newEmpresa.UF = UF,
                    newEmpresa.Descricao = Descricao;
                const hashDigest = (0, sha256_1.default)(Senha);
                logger_1.default.debug("HashAntes: ", hashDigest);
                const privateKey = "Empcd";
                const hmacDigest = enc_base64_1.default.stringify((0, hmac_sha512_1.default)(hashDigest, privateKey));
                logger_1.default.debug("HashDepois: ", hashDigest);
                newEmpresa.Senha = hmacDigest;
                yield Empresa_repositories_1.default.save(newEmpresa);
            }
            catch (err) {
                console.log(err);
                return 'Failed to sign Up' + err;
            }
        });
    }
    GetIdEmpresa(Token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = (0, jwt_decode_1.jwtDecode)(Token);
            if (!payload) {
                return new Error(`Invalid Empresa`);
            }
            /*const hashDigest = sha256(payload.Senha);
            logger.debug("HashAntes: ", hashDigest)
            const privateKey = "Empcd"
            const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey))
            logger.debug("HashDepois: ",hashDigest)
            const foundEmpresa = await EmpresaRepository.findOneBy({Email: payload.Email, Senha: hmacDigest});
            if(foundEmpresa) {
                const IdEmpresa = foundEmpresa.IdEmpresa
                return IdEmpresa
            } else {
                return new Error("id Empresa not found")
            }*/
            if (payload.idEmpresa) {
                const idEmpresa = payload.idEmpresa;
                return idEmpresa;
            }
            else {
                return new Error("id Empresa not found");
            }
        });
    } //ok - conferir hash no front
    signUpEmpresasInBatch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = req.body;
            const Empresas = [];
            if (file != null) {
                fs_1.default.createReadStream(file.path)
                    .pipe((0, csv_parser_1.default)())
                    .on('data', (data) => Empresas.push(this.getEmpresaFromData(data.RazaoSocial, data.NomeFantasia, data.Email, data.Site, data.Senha, data.CNPJ, data.Cidade, data.Bairro, data.UF, data.Descricao)))
                    .on('end', () => {
                    console.log(Empresas);
                    Empresa_repositories_1.default.insert(Empresas);
                });
            }
        });
    }
}
exports.default = EmpresaLoginService;
