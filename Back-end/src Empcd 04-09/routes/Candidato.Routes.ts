import { Router } from "express";
import CandidatoController from "../controllers/Candidato.controllers";
import VagaController from "../controllers/Vaga.controllers";

const Candidatorouter = Router();

Candidatorouter.post("/", new CandidatoController().createCandidato);
Candidatorouter.get("/", new CandidatoController().getAll);
Candidatorouter.get("/:idCand", new CandidatoController().getCandidatoId);
Candidatorouter.delete("/:idCand", new CandidatoController().deleteCandidato);
Candidatorouter.put('/:idCand', new CandidatoController().updateCandidato);
Candidatorouter.put('/:idCand/vaga/:idVaga', new VagaController().candidataVaga);

export default Candidatorouter;
