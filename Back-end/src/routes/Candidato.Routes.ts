import { Router } from "express";
import CandidatoController from "../controllers/Candidato.controllers";
import CandidatoLoginController from "../controllers/Candidato.login.controller";
import VagaController from "../controllers/Vaga.controllers";
import { upload } from "../config/multer-config";

const CandidatoRouter = Router();

CandidatoRouter.post('/login', new CandidatoLoginController().loginCandidato); 
CandidatoRouter.post('/signUp', new CandidatoLoginController().signUpCandidato); 
CandidatoRouter.get("/:Email/:Senha", new CandidatoLoginController().GetIdCandidato);
CandidatoRouter.put('/update-image', upload.single('image'), new CandidatoLoginController().updateCandidatoImage)
CandidatoRouter.post("/", new CandidatoController().createCandidato); 
CandidatoRouter.get("/", new CandidatoController().getAll); 
CandidatoRouter.get("/:idCand", new CandidatoController().getCandidatoId); 
CandidatoRouter.delete("/:idCand", new CandidatoController().deleteCandidato); 
CandidatoRouter.put('/:idCand', new CandidatoController().updateCandidato); 
CandidatoRouter.put('/:idCand/vaga/:idVaga', new VagaController().candidataVaga); 


export default CandidatoRouter;
