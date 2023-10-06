import { Router } from "express";
import CandidatoController from "../controllers/Candidato.controllers";
import CandidatoLoginController from "../controllers/Candidato.login.controller";
import VagaController from "../controllers/Vaga.controllers";

const Candidatorouter = Router();

Candidatorouter.post('/login', new CandidatoLoginController().loginCandidato); //ok?
Candidatorouter.post('/signUp', new CandidatoLoginController().signUpCandidato); //ok
// Candidatorouter.post('/batch-sign-up', new CandidatoLoginController().signUpCandidatosInBatch); tempo perdido
Candidatorouter.post("/", new CandidatoController().createCandidato); //ok
Candidatorouter.get("/", new CandidatoController().getAll); //ok
Candidatorouter.get("/:idCand", new CandidatoController().getCandidatoId); //ok
Candidatorouter.delete("/:idCand", new CandidatoController().deleteCandidato); //ok
Candidatorouter.put('/:idCand', new CandidatoController().updateCandidato); //ok
Candidatorouter.put('/:idCand/vaga/:idVaga', new VagaController().candidataVaga); //rever

export default Candidatorouter;
