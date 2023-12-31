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
const Empresa_login_Service_1 = __importDefault(require("../services/Empresa.login.Service"));
class EmpresaLoginController {
    loginEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, Senha } = req.body;
            try {
                const token = yield new Empresa_login_Service_1.default().loginEmpresa(Email, Senha);
                res.status(200).send({ token: token });
            }
            catch (err) {
                res.status(401).send("Login Failed");
            }
        });
    }
    signUpEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { RazaoSocial, NomeFantasia, Email, Site, Senha, CNPJ, Cidade, Bairro, UF, Descricao } = req.body;
            try {
                yield new Empresa_login_Service_1.default().signUpEmpresa(RazaoSocial, NomeFantasia, Email, Site, Senha, CNPJ, Cidade, Bairro, UF, Descricao);
                res.json('Bem criado!');
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    GetIdEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Token = req.params.Token;
            try {
                const IdEmpresa = yield new Empresa_login_Service_1.default().GetIdEmpresa(Token);
                res.json(IdEmpresa);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    signUpEmpresasInBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmpresa = req.file;
            console.log(req);
            if (!newEmpresa) {
                return res.status(403).send('error importing Empresa');
            }
            const savedEmpresa = yield new Empresa_login_Service_1.default().signUpEmpresasInBatch(req);
            res.json(`request saved with successful ${JSON.stringify(savedEmpresa)}`);
        });
    }
}
exports.default = EmpresaLoginController;
//Fazer timer de login
