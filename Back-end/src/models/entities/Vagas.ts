import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Vagas{
    @PrimaryColumn()
    IdVaga: string

    @Column()
    IdEmpresa: string

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
}

export default Vagas;
