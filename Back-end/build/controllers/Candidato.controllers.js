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
const Candidato_Service_1 = __importDefault(require("../services/Candidato.Service"));
class CandidatoController {
    createCandidato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Candidatoobject = req.body;
                console.log(Candidatoobject);
                if (!Candidatoobject) {
                    return res.status(204).send('not all data in Candidato');
                }
                const savedCandidato = yield Candidato_Service_1.default.Instance().createCandidatoPerfil(Candidatoobject);
                res.send(`resquest saved whith successful ${JSON.stringify(savedCandidato)}`);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Candidatoget = yield Candidato_Service_1.default.Instance().allCandidato();
                res.json(Candidatoget);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    getCandidatoId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idCandidato = req.params.id;
                const Candidatobyid = yield Candidato_Service_1.default.Instance().IdbyCandidato(idCandidato);
                console.log(Candidatobyid);
                res.json(Candidatobyid);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    deleteCandidato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idCandidato = req.params.idCand;
                const deleteid = yield Candidato_Service_1.default.Instance().deleteCandidatoId(idCandidato);
                res.json(deleteid);
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
    updateCandidato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idCandidato = req.params.idCand;
                const CandidatoObject = req.body;
                yield Candidato_Service_1.default.Instance().updateCandidato(idCandidato, CandidatoObject);
                res.json({ Mensagem: "Candidato already updated" });
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
}
exports.default = CandidatoController;
