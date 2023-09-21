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
const User_Service_1 = __importDefault(require("../services/User.Service"));
class UserController {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const token = yield new User_Service_1.default().loginUser(email, password);
                res.status(200).send({ token: token });
            }
            catch (err) {
                res.status(401).send("Login Failed");
            }
        });
    }
    signUpUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = req.body;
            try {
                yield new User_Service_1.default().signUpUser(name, email, password);
                res.json('Bem criado!');
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    signUpUsersInBatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = req.file;
            console.log(req);
            if (!newUser) {
                return res.status(403).send('error importing user');
            }
            const savedUser = yield new User_Service_1.default().signUpUsersInBatch(req);
            res.json(`request saved with successful ${JSON.stringify(savedUser)}`);
        });
    }
}
exports.default = UserController;
