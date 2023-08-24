import { Entity, Column, PrimaryColumn } from "typeorm";

Entity()
class Vaga{
    @PrimaryColumn()
    IdVaga: string

    @Column()
    IdEmpresa: string

    @Column()
    TituloVaga: string

    @Column()
    Local: string

    @Column()
    DataPostagem: Date

    @Column()
    Requisitos: string

    @Column()
    DataFinal: Date
}

export default Vaga;
