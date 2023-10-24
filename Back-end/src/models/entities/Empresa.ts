import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import Vagas from "./Vagas";

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

    @Column({nullable: true})
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

    @OneToMany(() => Vagas, (vagas) => vagas.empresa) // note: we will create author property in the Photo class below
    vagas: Vagas[]
}

export default Empresa;