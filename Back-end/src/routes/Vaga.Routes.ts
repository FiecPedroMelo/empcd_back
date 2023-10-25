import { Router } from "express";
import VagaController from "../controllers/Vaga.controllers";

const Vagarouter = Router();

Vagarouter.post("/", new VagaController().createVaga); //ok
Vagarouter.get("/", new VagaController().getVagas); //ok
Vagarouter.get("/:idVaga", new VagaController().getVagaById); //ok
Vagarouter.get("/:NomeFantasia", new VagaController().vagaSearcherEmpresa)

export default Vagarouter;