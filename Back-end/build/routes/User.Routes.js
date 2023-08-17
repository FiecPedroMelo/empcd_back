"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controllers_1 = __importDefault(require("../controllers/User.Controllers"));
const router = (0, express_1.Router)();
router.post('/login', new User_Controllers_1.default().loginUser);
router.post('/signUp', new User_Controllers_1.default().signUpUser);
exports.default = router;
