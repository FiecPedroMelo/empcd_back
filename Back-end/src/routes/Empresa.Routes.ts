import { Router } from "express";
import EmpresaController from "../controllers/Empresa.controllers";
import VagaController from "../controllers/Vaga.controllers";
import EmpresaLoginController from "../controllers/Empresa.login.Controllers";
import { upload } from "../config/multer-config";

const EmpresaRouter = Router();

EmpresaRouter.post("/login", new EmpresaLoginController().loginEmpresa);
EmpresaRouter.post("/signup", new EmpresaLoginController().signUpEmpresa);
EmpresaRouter.put('/update-image', upload.single('image'), new EmpresaLoginController().updateEmpresaImage)
EmpresaRouter.post("/", new EmpresaController().createEmpresa); 
EmpresaRouter.get("/", new EmpresaController().getAll); 
EmpresaRouter.get("/:idEmpresa", new EmpresaController().EmpresaById); 
EmpresaRouter.get("/:Email/:Senha", new EmpresaLoginController().GetIdEmpresa);
EmpresaRouter.delete("/:idEmpresa", new EmpresaController().deleteEmpresa); 
EmpresaRouter.put('/:idEmpresa', new EmpresaController().updateEmpresa); 
EmpresaRouter.post("/:idEmpresa/vaga", new VagaController().createVaga); 
EmpresaRouter.put("/vaga/:idVaga", new VagaController().updateVaga); 
EmpresaRouter.get("/:idEmpresa/vaga", new VagaController().vagaSearcherEmpresa)


export default EmpresaRouter;
