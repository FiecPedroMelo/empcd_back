import { Router } from "express";
import CandidatoController from "../controllers/Candidato.controllers";
import CandidatoLoginController from "../controllers/Candidato.login.controller";
import VagaController from "../controllers/Vaga.controllers";

const CandidatoRouter = Router();

CandidatoRouter.post('/login', new CandidatoLoginController().loginCandidato); //ok - token
CandidatoRouter.post('/signUp', new CandidatoLoginController().signUpCandidato); //ok - token

CandidatoRouter.get("/:Token/getId", new CandidatoLoginController().GetIdCandidato); //ok - token
CandidatoRouter.get("/", new CandidatoController().getAll); //ok - token
CandidatoRouter.get("/:Token/getById", new CandidatoController().getCandidatoId); //ok - token

CandidatoRouter.put('/:Token/updateCandidato', new CandidatoController().updateCandidato); //ok - token
CandidatoRouter.put('/:Token/vaga/:idVaga/candidataVaga', new VagaController().candidataVaga); //ok - token

CandidatoRouter.delete("/:Token/deleteCandidato", new CandidatoController().deleteCandidato); //ok 


export default CandidatoRouter;
