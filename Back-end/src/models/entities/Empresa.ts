import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
class Empresa{
    @PrimaryColumn()
    IdEmpresa: string;

    @Column()
    RazaoSocial: string;

    @Column()
    NomeFantasia: string;

    @Column()
    Email: string;

    @Column()
    Site: string;

    @Column()
    Senha: string;

    @Column()
    CNPJ: string;

    @Column()
    Cidade: string;

    @Column()
    Bairro: string;

    @Column()
    UF: string;

    @Column({nullable: true})
    ImagemEmpresa: string;
}

export default Empresa;