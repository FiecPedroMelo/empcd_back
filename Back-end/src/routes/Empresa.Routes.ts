import { Router } from "express";
import EmpresaController from "../controllers/Empresa.controllers";
import VagaController from "../controllers/Vaga.controllers";
import EmpresaLoginController from "../controllers/Empresa.login.Controllers";

const EmpresaRouter = Router();

EmpresaRouter.get("/:Token/empresa", new EmpresaController().EmpresaById); //ok - token
EmpresaRouter.get("/:Token/getId", new EmpresaLoginController().GetIdEmpresa); //ok - token
EmpresaRouter.get("/:Token/getVagas", new VagaController().vagaSearcherEmpresa); //ok - token

EmpresaRouter.post("/login", new EmpresaLoginController().loginEmpresa); //ok - token
EmpresaRouter.post("/signup", new EmpresaLoginController().signUpEmpresa); //ok - token
EmpresaRouter.post("/:Token/vagas", new VagaController().createVaga); //ok - token

EmpresaRouter.put('/:idEmpresa/updateEmpresa', new EmpresaController().updateEmpresa); //Rever(Tabelas interligadas)
EmpresaRouter.delete("/:idEmpresa", new EmpresaController().deleteEmpresa); //Rever(Tabelas interligadas)

//EmpresaRouter.get("/", new EmpresaController().getAll);
//EmpresaRouter.get("/vagas", new VagaController().getVagas); 
//EmpresaRouter.get("/vagas/:idVaga", new VagaController().getVagaById); 
//EmpresaRouter.post("/", new EmpresaController().createEmpresa); 
//EmpresaRouter.put("/vagas/:idVaga", new VagaController().updateVaga); 

export default EmpresaRouter;
