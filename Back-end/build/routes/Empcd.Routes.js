"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Empcd_controllers_1 = __importDefault(require("../controllers/Empcd.controllers"));
const router = (0, express_1.Router)();
router.post("/create", new Empcd_controllers_1.default().createEmpcd);
router.get("/getAll", new Empcd_controllers_1.default().getAll);
router.get("/getEmpcdId", new Empcd_controllers_1.default().getEmpcdId);
router.post("/delete", new Empcd_controllers_1.default().deleteEmpcd);
router.post('/update', new Empcd_controllers_1.default().updateEmpcd);
