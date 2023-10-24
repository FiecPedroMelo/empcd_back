import { AppDataSource } from "../../data-source";
import { Vaga_aux } from "../entities/Vaga_aux";

const Vaga_auxRepository = AppDataSource.getRepository(Vaga_aux);

export default Vaga_auxRepository;