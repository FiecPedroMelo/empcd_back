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
                console.log(VagaObject);
                if (!VagaObject) {
                    return res.status(204).send('Not all data in Vaga');
                }
                const savedVaga = yield Vaga_Service_1.default.Instance().createVaga(VagaObject);
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
}
exports.default = VagaController;