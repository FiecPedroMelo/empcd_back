import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import Vagas from "./Vagas";
import { Vaga_aux } from "./Vaga_aux";

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

    @OneToMany(() => Vagas, (vagas) => vagas.empresa, {nullable: true}) 
    vagas: Vagas[];

    @OneToMany(() => Vaga_aux, (vaga_aux) => vaga_aux.empresa, {nullable: true}) 
    vaga_aux: Vaga_aux[];

}

export default Empresa;