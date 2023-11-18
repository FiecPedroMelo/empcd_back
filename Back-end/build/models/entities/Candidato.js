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
const Vaga_aux_1 = __importDefault(require("./Vaga_aux"));
let Candidato = class Candidato {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Candidato.prototype, "IdCand", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "NomeCompleto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "CPF", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Telefone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Senha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Genero", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Deficiencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Candidato.prototype, "DataNasc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Cidade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Bairro", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Formacao", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext"),
    __metadata("design:type", String)
], Candidato.prototype, "ExpAnteriores", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "Habilidades", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Vaga_aux_1.default, (vaga_aux) => vaga_aux.candidato, { nullable: true, onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Candidato.prototype, "vaga_aux", void 0);
Candidato = __decorate([
    (0, typeorm_1.Entity)()
], Candidato);
exports.default = Candidato;
