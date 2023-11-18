import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import Empresa from "./Empresa";
import Vaga_aux from "./Vaga_aux";

@Entity()
class Vagas{
    @PrimaryColumn()
    IdVaga: string

    @Column()
    TituloCargo: string

    @Column()
    Localizacao: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public DataPostagem: Date

    @Column()
    Requisitos: string

    @Column()
    DescricaoVaga: string

    @Column({default: true})
    Status: boolean

    @ManyToOne(() => Empresa, (empresa) => empresa.vagas, {onDelete: "CASCADE"})
    empresa: Empresa

    @OneToMany(() => Vaga_aux, (vaga_aux) => vaga_aux.vagas, {nullable: true})
    vaga_aux: Vaga_aux
}

export default Vagas;
