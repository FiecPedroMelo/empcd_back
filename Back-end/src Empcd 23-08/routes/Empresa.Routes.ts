import { Router } from "express";
import EmpresaController from "../controllers/Empresa.controllers";

const Empresarouter = Router();

Empresarouter.post("/create", new EmpresaController().createEmpresa);
Empresarouter.get("/getAll", new EmpresaController().getAll);
Empresarouter.get("/getEmpresaId", new EmpresaController().getEmpresaId);
Empresarouter.post("/delete", new EmpresaController().deleteEmpresa);
Empresarouter.post('/update', new EmpresaController().updateEmpresa);
Empresarouter.post("/createVaga", new EmpresaController().createVaga);
Empresarouter.post("/updateVaga", new EmpresaController().updateVaga);

export default Empresarouter;
