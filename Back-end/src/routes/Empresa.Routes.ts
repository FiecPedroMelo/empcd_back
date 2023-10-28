import { Router } from "express";
import EmpresaController from "../controllers/Empresa.controllers";
import VagaController from "../controllers/Vaga.controllers";
import EmpresaLoginController from "../controllers/Empresa.login.Controllers";

const EmpresaRouter = Router();

EmpresaRouter.get("/:idEmpresa/getEmpresa", new EmpresaController().EmpresaById); //ok
EmpresaRouter.get("/:Email/:Senha/:Token/getId", new EmpresaLoginController().GetIdEmpresa); //ok - conferir hash no front
EmpresaRouter.get("/:idEmpresa/getVagas", new VagaController().vagaSearcherEmpresa); //ok

EmpresaRouter.post("/login", new EmpresaLoginController().loginEmpresa); //ok
EmpresaRouter.post("/signup", new EmpresaLoginController().signUpEmpresa); //ok
EmpresaRouter.post("/:idEmpresa/vagas", new VagaController().createVaga); //ok

EmpresaRouter.put('/:idEmpresa/updateEmpresa', new EmpresaController().updateEmpresa); //ok

EmpresaRouter.delete("/:idEmpresa", new EmpresaController().deleteEmpresa); 

//EmpresaRouter.get("/", new EmpresaController().getAll);
//EmpresaRouter.get("/vagas", new VagaController().getVagas); 
//EmpresaRouter.get("/vagas/:idVaga", new VagaController().getVagaById); 
//EmpresaRouter.post("/", new EmpresaController().createEmpresa); 
//EmpresaRouter.put("/vagas/:idVaga", new VagaController().updateVaga); 

export default EmpresaRouter;
