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
            const { CNPJ, RazaoSocial, NomeFantasia, Email, Senha, Cep, Endereco, ImagemEmpresa } = req.body;
            try {
                yield new Empresa_login_Service_1.default().signUpEmpresa(CNPJ, RazaoSocial, NomeFantasia, Email, Senha, Cep, Endereco, ImagemEmpresa);
                res.json('Bem criado!');
            }
            catch (err) {
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
    updateEmpresaImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.file);
            yield new Empresa_login_Service_1.default().updateEmpresaImage(req);
            res.json('files');
        });
    }
}
exports.default = EmpresaLoginController;
