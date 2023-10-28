import { Router } from "express";
import VagaController from "../controllers/Vaga.controllers";

const VagaRouter = Router();

// VagaRouter.post("/", new VagaController().createVaga); 
// VagaRouter.put("/:idVaga", new VagaController().updateVaga); ok
VagaRouter.get("/", new VagaController().getVagas); //ok
VagaRouter.get("/:idVaga/getbyID", new VagaController().getVagaById); //ok
//VagaRouter.get("/:NomeFantasia", new VagaController().vagaSearcherEmpresa) 

export default VagaRouter;