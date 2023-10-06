import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
class Empresa{
    @PrimaryColumn()
    IdEmpresa: string;

    @Column()
    CNPJ: string;

    @Column()
    RazaoSocial: string;

    @Column()
    NomeFantasia: string;

    @Column()
    Email: string;

    @Column()
    Senha: string;

    @Column()
    Cep: string;

    @Column()
    Endereco: string;
}

export default Empresa;