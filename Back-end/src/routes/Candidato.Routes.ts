import { Router } from "express";
import CandidatoController from "../controllers/Candidato.controllers";
import CandidatoLoginController from "../controllers/Candidato.login.controller";
import VagaController from "../controllers/Vaga.controllers";
import { upload } from "../config/multer-config";

const CandidatoRouter = Router();

CandidatoRouter.post('/login', new CandidatoLoginController().loginCandidato); //ok
CandidatoRouter.post('/signUp', new CandidatoLoginController().signUpCandidato); //ok
CandidatoRouter.put('/update-image', upload.single('image'), new CandidatoLoginController().updateCandidatoImage) //ver
CandidatoRouter.post("/", new CandidatoController().createCandidato); //ok
CandidatoRouter.get("/", new CandidatoController().getAll); //ok
CandidatoRouter.get("/:idCand", new CandidatoController().getCandidatoId); //ok
CandidatoRouter.delete("/:idCand", new CandidatoController().deleteCandidato); //ok
CandidatoRouter.put('/:idCand', new CandidatoController().updateCandidato); //ok
CandidatoRouter.put('/:idCand/vaga/:idVaga', new VagaController().candidataVaga); //ok



export default CandidatoRouter;
