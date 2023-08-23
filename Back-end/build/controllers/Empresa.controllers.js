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
const Empresa_Service_1 = __importDefault(require("../services/Empresa.Service"));
class EmpresaController {
    createEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Empresaobject = req.body;
                console.log(Empresaobject);
                if (!Empresaobject) {
                    return res.status(204).send('Not all data in Empresa');
                }
                const savedEmpresa = yield Empresa_Service_1.default.Instance().createEmpresaPerfil(Empresaobject);
                res.send(`request saved with succesful ${JSON.stringify(savedEmpresa)}`);
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
                const Empresaget = yield Empresa_Service_1.default.Instance().allEmpresa();
                res.json(Empresaget);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    getEmpresaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEmpresa = req.params.id;
                const Empresabyid = yield Empresa_Service_1.default.Instance().IdbyEmpresa(idEmpresa);
                console.log(Empresabyid);
                res.json(Empresabyid);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    deleteEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEmpresa = req.params.id;
                const deleteid = yield Empresa_Service_1.default.Instance().deleteEmpresaId(idEmpresa);
                res.json(deleteid);
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
    updateEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idEmpresa = req.params.id;
                const EmpresaObject = req.body;
                yield Empresa_Service_1.default.Instance().updateEmpresa(idEmpresa, EmpresaObject);
                res.json({ Mensagem: "Empresa already updated" });
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
}
exports.default = EmpresaController;
