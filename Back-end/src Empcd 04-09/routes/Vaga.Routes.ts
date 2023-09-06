import { Router } from "express";
import VagaController from "../controllers/Vaga.controllers";

const Vagarouter = Router();

Vagarouter.post("/", new VagaController().createVaga);
Vagarouter.get("/", new VagaController().getVagas);
Vagarouter.get("/:idVaga", new VagaController().getVagaById);

export default Vagarouter;