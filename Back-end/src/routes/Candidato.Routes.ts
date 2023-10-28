import { Router } from "express";
import CandidatoController from "../controllers/Candidato.controllers";
import CandidatoLoginController from "../controllers/Candidato.login.controller";
import VagaController from "../controllers/Vaga.controllers";

const CandidatoRouter = Router();

CandidatoRouter.post('/login', new CandidatoLoginController().loginCandidato); //ok
CandidatoRouter.post('/signUp', new CandidatoLoginController().signUpCandidato); //ok

CandidatoRouter.get("/:Email/:Senha/getId", new CandidatoLoginController().GetIdCandidato); //ok
CandidatoRouter.get("/", new CandidatoController().getAll); //ok
CandidatoRouter.get("/:idCand", new CandidatoController().getCandidatoId); //ok

CandidatoRouter.put('/:idCand/updateCandidato', new CandidatoController().updateCandidato); //ok
CandidatoRouter.put('/:idCand/vaga/:idVaga/candidataVaga', new VagaController().candidataVaga); //ok

CandidatoRouter.delete("/:idCand/deleteCandidato", new CandidatoController().deleteCandidato); //ok


export default CandidatoRouter;
