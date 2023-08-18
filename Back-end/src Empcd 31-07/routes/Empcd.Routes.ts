import { Router } from "express";
import EmpcdController from "../controllers/Empcd.controllers";

const router = Router();

router.post("/create", new EmpcdController().createEmpcd);
router.get("/getAll", new EmpcdController().getAll);
router.get("/getEmpcdId", new EmpcdController().getEmpcdId);
router.post("/delete", new EmpcdController().deleteEmpcd);
router.post('/update', new EmpcdController().updateEmpcd);
