"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const logger_1 = __importDefault(require("./logger"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const tempFolder = process.env.TMP;
        logger_1.default.info(tempFolder);
        cb(null, `${tempFolder}`);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix) + file.originalname.substring(file.originalname.indexOf('.'));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.upload = upload;
