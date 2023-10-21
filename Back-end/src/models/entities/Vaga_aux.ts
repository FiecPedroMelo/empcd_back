import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import Candidato from "./Candidato";

@Entity()
export class Vaga_aux {
    @PrimaryColumn()
    IdVagaAux: string

    @Column()
    IdVaga: string

    @Column()
    IdCand: string

    @Column({default: true})
    Status: boolean
    
//    @ManyToMany(() => Candidato)
//    @JoinTable()
//    candidatos: Candidato[]
}