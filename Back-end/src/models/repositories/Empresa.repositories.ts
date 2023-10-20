import { AppDataSource } from "../../data-source";
import Empresa from "../entities/Empresa";

const EmpresaRepository = AppDataSource.getRepository(Empresa);

export default EmpresaRepository;