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
const Candidato_login_Service_1 = __importDefault(require("../services/Candidato.login.Service"));
class CandidatoLoginController {
    loginCandidato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Email, Senha } = req.body;
            try {
                const token = yield new Candidato_login_Service_1.default().loginCandidato(Email, Senha);
                res.status(200).send({ token: token });
            }
            catch (err) {
                res.status(401).send("Login Failed");
            }
        });
    }
    signUpCandidato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { NomeCompleto, Email, Senha, Telefone, CPF, DataNasc, Endereco, Formacao, ExpProfissional, Deficiencia, Cep, Habilidades, ImagemCandidato } = req.body;
            try {
                yield new Candidato_login_Service_1.default().signUpCandidato(NomeCompleto, Email, Senha, Telefone, CPF, DataNasc, Endereco, Formacao, ExpProfissional, Deficiencia, Cep, Habilidades, ImagemCandidato);
                res.json('Bem criado!');
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    signUpCandidatosInBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCandidato = req.file;
            console.log(req);
            if (!newCandidato) {
                return res.status(403).send('error importing Candidato');
            }
            const savedCandidato = yield new Candidato_login_Service_1.default().signUpCandidatosInBatch(req);
            res.json(`request saved with successful ${JSON.stringify(savedCandidato)}`);
        });
    }
    updateCandidatoImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.file);
            yield new Candidato_login_Service_1.default().updateCandidatoImage(req);
            res.json('files');
        });
    }
}
exports.default = CandidatoLoginController;
