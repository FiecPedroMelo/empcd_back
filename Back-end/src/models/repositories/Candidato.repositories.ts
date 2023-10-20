import { AppDataSource } from "../../data-source";
import Candidato from "../entities/Candidato";

const CandidatoRepository = AppDataSource.getRepository(Candidato);

export default CandidatoRepository;