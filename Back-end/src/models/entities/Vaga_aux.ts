import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import Candidato from "./Candidato";
import Empresa from "./Empresa";
import Vagas from "./Vagas";

@Entity()
export class Vaga_aux {
    @PrimaryColumn()
    IdVagaAux: string

    @ManyToOne(() => Empresa, (empresa) => empresa.vaga_aux, {onDelete: "CASCADE"})
    empresa: Empresa

    @ManyToOne(() => Candidato, (candidato) => candidato.vaga_aux, {onDelete: "CASCADE"})
    candidato: Candidato
    
    @ManyToOne(() => Vagas, (vagas) => vagas.vaga_aux, {onDelete: "CASCADE"})
    vagas: Vagas
}
