import { Router } from "express";
import EmpresaController from "../controllers/Empresa.controllers";
import VagaController from "../controllers/Vaga.controllers";

const Empresarouter = Router();

Empresarouter.post("/", new EmpresaController().createEmpresa); //ok
Empresarouter.get("/", new EmpresaController().getAll); //ok
Empresarouter.get("/:idEmpresa", new EmpresaController().getEmpresaId); //ok
Empresarouter.delete("/:idEmpresa", new EmpresaController().deleteEmpresa); //ok
Empresarouter.put('/:idEmpresa', new EmpresaController().updateEmpresa); //ok
Empresarouter.post("/:idEmpresa/vaga/", new VagaController().createVaga); //ok
Empresarouter.put("/vaga/:idVaga", new VagaController().updateVaga); //ok

export default Empresarouter;
