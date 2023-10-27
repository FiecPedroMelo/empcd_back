import { Router } from "express";
import EmpresaController from "../controllers/Empresa.controllers";
import VagaController from "../controllers/Vaga.controllers";
import EmpresaLoginController from "../controllers/Empresa.login.Controllers";
import { upload } from "../config/multer-config";

const EmpresaRouter = Router();

EmpresaRouter.post("/login", new EmpresaLoginController().loginEmpresa);//ok
EmpresaRouter.post("/signup", new EmpresaLoginController().signUpEmpresa);//ok
EmpresaRouter.put('/update-image', upload.single('image'), new EmpresaLoginController().updateEmpresaImage) //ver
EmpresaRouter.post("/", new EmpresaController().createEmpresa); //ok
EmpresaRouter.get("/", new EmpresaController().getAll); //ok
EmpresaRouter.get("/:idEmpresa", new EmpresaController().EmpresaById); //ok
EmpresaRouter.get("/:Email/:Senha", new EmpresaLoginController().GetIdEmpresa);
EmpresaRouter.delete("/:idEmpresa", new EmpresaController().deleteEmpresa); //ok
EmpresaRouter.put('/:idEmpresa', new EmpresaController().updateEmpresa); //ok
EmpresaRouter.post("/:idEmpresa/vaga/", new VagaController().createVaga); //ok
EmpresaRouter.put("/vaga/:idVaga", new VagaController().updateVaga); //ok
EmpresaRouter.get("/:NomeFantasia", new VagaController().vagaSearcherEmpresa)


export default EmpresaRouter;
