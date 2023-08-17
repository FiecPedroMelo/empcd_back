import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column, PrimaryColumn, CreateDateColumn } from "typeorm"

@Entity()
export class Empcd{
    @PrimaryColumn()
    IdCand: string

    @Column()
    NomeCompleto: string

    @Column()
    Email: string

    @Column()
    Telefone: string

    @Column()
    CPF: string

    @Column({type: 'date'})
    DataNasc: Date

    @Column()
    Endereco: string

    @Column()
    Formacao: string

    @Column()
    ExpProfissional: string

    @Column()
    Senha: string

    @Column()
    Deficiencia: string
    static body: any
}

export default Empcd;
