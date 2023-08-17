import { AppDataSource } from "../../data-source";
import Empcd from "../entities/Empcd";

const empcdRepository = AppDataSource.getRepository(Empcd);

export default empcdRepository;