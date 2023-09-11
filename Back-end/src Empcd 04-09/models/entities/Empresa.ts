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
}

export default Empresa;