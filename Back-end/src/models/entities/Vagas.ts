import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import Empresa from "./Empresa";

@Entity()
export class Vagas{
    @PrimaryColumn()
    IdVaga: string

    @ManyToOne(() => Empresa, (empresa) => empresa.vagas)
    empresa: Empresa

    @Column()
    TituloCargo: string

    @Column()
    Localizacao: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public DataPostagem: Date

    @Column()
    Requisitos: string

    @Column()
    Descricao: string

    @Column({default: true})
    Status: boolean
}

export default Vagas;
