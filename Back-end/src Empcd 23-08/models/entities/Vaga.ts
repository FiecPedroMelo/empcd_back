import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Vaga{
    @PrimaryColumn()
    IdVaga: string

    @Column()
    IdEmpresa: string

    @Column({default: null})
    IdCandidato: string

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
}

export default Vaga;
