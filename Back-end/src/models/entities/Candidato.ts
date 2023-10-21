import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable} from "typeorm"
import Vaga from "./Vagas"

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

    @Column()
    ExpAnteriores: string

    @Column()
    Habilidades: string

    @Column({nullable: true})
    ImagemCandidato: string

    @ManyToMany(() => Vaga, )
    @JoinTable()
    vaga: Vaga[]

    static body: any
}

export default Candidato;
