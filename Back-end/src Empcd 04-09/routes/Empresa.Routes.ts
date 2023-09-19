import { Router } from "express";
import EmpresaController from "../controllers/Empresa.controllers";
import VagaController from "../controllers/Vaga.controllers";

const Empresarouter = Router();

Empresarouter.post("/", new EmpresaController().createEmpresa);
Empresarouter.get("/", new EmpresaController().getAll);
Empresarouter.get("/:idEmpresa", new EmpresaController().getEmpresaId);
Empresarouter.delete("/:idEmpresa", new EmpresaController().deleteEmpresa);
Empresarouter.put('/:idEmpresa', new EmpresaController().updateEmpresa);
Empresarouter.post("/:idEmpresa/vaga/", new VagaController().createVaga);
Empresarouter.put("/vaga/:idVaga", new VagaController().updateVaga);

export default Empresarouter;
