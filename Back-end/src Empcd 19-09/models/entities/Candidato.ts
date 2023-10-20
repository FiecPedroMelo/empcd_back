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
    Telefone: string

    @Column()
    CPF: string

    @Column({type: 'date'})
    DataNasc: Date

    @Column()
    Endereco: string

    @Column()
    Cep: string

    @Column()
    Formacao: string

    @Column()
    ExpProfissional: string

    @Column()
    Habilidades: string

    @Column()
    Senha: string

    @Column()
    Deficiencia: string

    @Column({nullable: true})
    ImagemCandidato: string

    @ManyToMany(() => Vaga, )
    @JoinTable()
    vaga: Vaga[]

    static body: any
}

export default Candidato;
