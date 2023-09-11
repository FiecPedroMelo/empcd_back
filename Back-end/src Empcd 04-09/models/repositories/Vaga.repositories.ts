import { AppDataSource } from "../../data-source";
import Vaga from "../entities/Vaga";

const vagaRepository = AppDataSource.getRepository(Vaga);

export default vagaRepository;