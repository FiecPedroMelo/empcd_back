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
const Vaga_Service_1 = __importDefault(require("../services/Vaga.Service"));
class VagaController {
    createVaga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const VagaObject = req.body;
                const idEmpresa = req.params.idEmpresa;
                if (!VagaObject) {
                    return res.status(204).send('Not all data in Vaga');
                }
                if (!idEmpresa) {
                    return res.status(500).send(`No valid Id`);
                }
                const savedVaga = yield Vaga_Service_1.default.Instance().createVaga(VagaObject, idEmpresa);
                res.send(`request saved with succesful ${JSON.stringify(savedVaga)}`);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    updateVaga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idVaga = req.params.id;
                const VagaObject = req.body;
                yield Vaga_Service_1.default.Instance().updateVaga(idVaga, VagaObject);
                res.json({ Mensagem: "Vaga already updated" });
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
    getVagas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Vagaget = yield Vaga_Service_1.default.Instance().getVaga();
                res.json(Vagaget);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    getVagaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idVaga = req.params.idVaga;
                const Vagabyid = yield Vaga_Service_1.default.Instance().getVagaById(idVaga);
                console.log(Vagabyid);
                res.json(Vagabyid);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    candidataVaga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idVaga = req.params.idVaga;
                const idCand = req.params.idCand;
                yield Vaga_Service_1.default.Instance().candidataVaga(idVaga, idCand);
                res.json({ Mensagem: "Vaga already updated" });
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
    vagaSearcherEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Vagaget = yield Vaga_Service_1.default.Instance().vagaSearcherEmpresa(req.params.NomeFantasia);
                res.json(Vagaget);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
}
exports.default = VagaController;
