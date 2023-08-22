import { Router } from "express";
import CandidatoController from "../controllers/Candidato.controllers";

const Candidatorouter = Router();

Candidatorouter.post("/create", new CandidatoController().createCandidato);
Candidatorouter.get("/getAll", new CandidatoController().getAll);
Candidatorouter.get("/getCandidatoId", new CandidatoController().getCandidatoId);
Candidatorouter.post("/delete", new CandidatoController().deleteCandidato);
Candidatorouter.post('/update', new CandidatoController().updateCandidato);

export default Candidatorouter;
