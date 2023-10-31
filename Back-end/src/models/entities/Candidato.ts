import { Entity, Column, PrimaryColumn, OneToMany} from "typeorm"
import { Vaga_aux } from "./Vaga_aux"

@Entity()
class Candidato{
    @PrimaryColumn()
    IdCand: string

    @Column()
    NomeCompleto: string

    @Column()
    Email: string

    @Column()
    CPF: string

    @Column()
    Telefone: string

    @Column()
    Senha: string

    @Column()
    Genero: string

    @Column()
    Deficiencia: string

    @Column({type: 'date'})
    DataNasc: Date

    @Column()
    Estado: string

    @Column()
    Cidade: string

    @Column()
    Bairro: string

    @Column()
    Formacao: string

    @Column("longtext")
    ExpAnteriores: string

    @Column()
    Habilidades: string

    @OneToMany(() => Vaga_aux, (vaga_aux) => vaga_aux.candidato, {nullable: true, onDelete: "CASCADE"})
    vaga_aux: Vaga_aux[];

    static body: any
}

export default Candidato;
