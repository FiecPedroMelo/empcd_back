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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = require("../constants");
function validator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bearerHeader = req.headers['authorization'];
        const bearerMiddle = bearerHeader === null || bearerHeader === void 0 ? void 0 : bearerHeader.split(' ');
        const bearerJson = JSON.stringify(bearerMiddle);
        const bearerString = JSON.parse(bearerJson);
        const bearer = bearerString.toString();
        const bearerToken = jwt.sign(req.params, bearer);
        try {
            const token = yield jwt.verify(bearerToken || '', constants_1.SECRET);
            req.authUser = { id: token.id };
            if (token) {
                next();
                return;
            }
            res.status(403).send("User not allowed 1");
        }
        catch (err) {
            res.status(403).send("User not allowed 2");
        }
    });
}
exports.validator = validator;
