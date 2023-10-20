import { AppDataSource } from "../../data-source";
import Vaga from "../entities/Vagas";

const vagaRepository = AppDataSource.getRepository(Vaga);

export default vagaRepository;