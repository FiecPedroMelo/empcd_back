import { Router } from "express";
import CandidatoController from "../controllers/Candidato.controllers";
import VagaController from "../controllers/Vaga.controllers";

const Candidatorouter = Router();

Candidatorouter.post("/", new CandidatoController().createCandidato); //ok
Candidatorouter.get("/", new CandidatoController().getAll); //ok
Candidatorouter.get("/:idCand", new CandidatoController().getCandidatoId); //ok
Candidatorouter.delete("/:idCand", new CandidatoController().deleteCandidato); //rever
Candidatorouter.put('/:idCand', new CandidatoController().updateCandidato); //ok
Candidatorouter.put('/:idCand/vaga/:idVaga', new VagaController().candidataVaga); //rever

export default Candidatorouter;
