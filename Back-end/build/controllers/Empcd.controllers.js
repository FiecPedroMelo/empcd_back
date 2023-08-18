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
const Empcd_Service_1 = __importDefault(require("../services/Empcd.Service"));
class EmpcdController {
    createEmpcd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const empcdobject = req.body;
                console.log(empcdobject);
                if (!empcdobject) {
                    return res.status(204).send('not all data in empcd');
                }
                const savedempcd = yield Empcd_Service_1.default.Instance().createEmpcdPerfil(empcdobject);
                res.send(`resquest saved whith successful ${JSON.stringify(savedempcd)}`);
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
                const empcdget = yield Empcd_Service_1.default.Instance().allEmpcd();
                res.json(empcdget);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    getEmpcdId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idempcd = req.params.id;
                const empcdbyid = yield Empcd_Service_1.default.Instance().IdbyEmpcd(idempcd);
                console.log(empcdbyid);
                res.json(empcdbyid);
            }
            catch (err) {
                res.status(500).send(err);
                console.log(err);
            }
        });
    }
    deleteEmpcd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idempcd = req.params.id;
                const deleteid = yield Empcd_Service_1.default.Instance().deleteEmpcdId(idempcd);
                res.json(deleteid);
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
    updateEmpcd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idempcd = req.params.id;
                const empcdObject = req.body;
                yield Empcd_Service_1.default.Instance().updateEmpcd(idempcd, empcdObject);
                res.json({ Mensagem: "Empcd already updated" });
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
}
exports.default = EmpcdController;
