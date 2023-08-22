import { Router } from "express";
import EmpcdController from "../controllers/Empcd.controllers";

const Empcdrouter = Router();

Empcdrouter.post("/create", new EmpcdController().createEmpcd);
Empcdrouter.get("/getAll", new EmpcdController().getAll);
Empcdrouter.get("/getEmpcdId", new EmpcdController().getEmpcdId);
Empcdrouter.post("/delete", new EmpcdController().deleteEmpcd);
Empcdrouter.post('/update', new EmpcdController().updateEmpcd);

export default Empcdrouter;
