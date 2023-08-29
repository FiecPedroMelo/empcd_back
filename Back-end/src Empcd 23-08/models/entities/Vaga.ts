import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import Candidato from "./Candidato";

@Entity()
export class Vaga{
    @PrimaryColumn()
    IdVaga: string

    @Column()
    IdEmpresa: string

    @Column()
    TituloVaga: string

    @Column()
    Local: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public DataPostagem: Date

    @Column()
    Requisitos: string

    @Column()
    DataFinal: Date

    @ManyToMany(() => Candidato)
    @JoinTable()
    candidatos: Candidato[]
}

export default Vaga;
