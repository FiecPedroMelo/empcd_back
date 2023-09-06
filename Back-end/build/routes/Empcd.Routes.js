"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Empcd_controllers_1 = __importDefault(require("../controllers/Empcd.controllers"));
const Empcdrouter = (0, express_1.Router)();
Empcdrouter.post("/create", new Empcd_controllers_1.default().createEmpcd);
Empcdrouter.get("/getAll", new Empcd_controllers_1.default().getAll);
Empcdrouter.get("/getEmpcdId", new Empcd_controllers_1.default().getEmpcdId);
Empcdrouter.post("/delete", new Empcd_controllers_1.default().deleteEmpcd);
Empcdrouter.post('/update', new Empcd_controllers_1.default().updateEmpcd);
exports.default = Empcdrouter;
