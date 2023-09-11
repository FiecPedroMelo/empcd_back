"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./config"));
const data_source_1 = require("./data-source");
const PORT = 38000;
const server = http_1.default.createServer({}, config_1.default);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log("SSL is enabled");
    data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log("Banco ok");
    })
        .catch((error) => console.log(error));
    console.log("Servidor ok");
});
