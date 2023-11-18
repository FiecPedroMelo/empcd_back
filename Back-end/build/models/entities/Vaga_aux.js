"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Candidato_1 = __importDefault(require("./Candidato"));
const Empresa_1 = __importDefault(require("./Empresa"));
const Vagas_1 = __importDefault(require("./Vagas"));
let Vaga_aux = class Vaga_aux {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Vaga_aux.prototype, "IdVagaAux", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Empresa_1.default, (empresa) => empresa.vaga_aux, { onDelete: "CASCADE" }),
    __metadata("design:type", Empresa_1.default)
], Vaga_aux.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Candidato_1.default, (candidato) => candidato.vaga_aux, { onDelete: "CASCADE" }),
    __metadata("design:type", Candidato_1.default)
], Vaga_aux.prototype, "candidato", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Vagas_1.default, (vagas) => vagas.vaga_aux, { onDelete: "CASCADE" }),
    __metadata("design:type", Vagas_1.default)
], Vaga_aux.prototype, "vagas", void 0);
Vaga_aux = __decorate([
    (0, typeorm_1.Entity)()
], Vaga_aux);
exports.default = Vaga_aux;
