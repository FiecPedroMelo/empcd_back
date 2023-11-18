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
const Empresa_1 = __importDefault(require("./Empresa"));
const Vaga_aux_1 = __importDefault(require("./Vaga_aux"));
let Vagas = class Vagas {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Vagas.prototype, "IdVaga", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vagas.prototype, "TituloCargo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vagas.prototype, "Localizacao", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", Date)
], Vagas.prototype, "DataPostagem", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vagas.prototype, "Requisitos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vagas.prototype, "DescricaoVaga", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Vagas.prototype, "Status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Empresa_1.default, (empresa) => empresa.vagas, { onDelete: "CASCADE" }),
    __metadata("design:type", Empresa_1.default)
], Vagas.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Vaga_aux_1.default, (vaga_aux) => vaga_aux.vagas, { nullable: true }),
    __metadata("design:type", Vaga_aux_1.default)
], Vagas.prototype, "vaga_aux", void 0);
Vagas = __decorate([
    (0, typeorm_1.Entity)()
], Vagas);
exports.default = Vagas;
