import { Response, Request } from "express";
import EmpresaServices from "../services/Empresa.Service";

class EmpresaController{

    public async createEmpresa(req: Request, res: Response) {
        try {
            const Empresaobject = req.body
            console.log(Empresaobject)
            if (!Empresaobject) {
                return res.status(204).send('Not all data in Empresa');
            }
            const savedEmpresa = await EmpresaServices.Instance().createEmpresaPerfil(Empresaobject)
            res.send(`request saved with succesful ${JSON.stringify(savedEmpresa)}`)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async getAll(req: Request, res: Response){
        try {
            const Empresaget = await EmpresaServices.Instance().allEmpresa()
            res.json(Empresaget)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async getEmpresaId(req: Request, res: Response) {
        try {
            const idEmpresa = req.params.id
            const Empresabyid = await EmpresaServices.Instance().IdbyEmpresa(idEmpresa)
            console.log(Empresabyid)
            res.json(Empresabyid)
        } catch (err) { 
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async deleteEmpresa(req: Request, res: Response) {
        try {
            const idEmpresa = req.params.idEmpresa
            console.log(idEmpresa)
        const deleteid = await EmpresaServices.Instance().deleteEmpresaId(idEmpresa)
        res.json(deleteid)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    public async updateEmpresa(req: Request, res: Response) {
        try {
            const idEmpresa = req.params.idEmpresa
            const EmpresaObject = req.body
            await EmpresaServices.Instance().updateEmpresa(idEmpresa, EmpresaObject)
            res.json({ Mensagem: "Empresa already updated"})
        } catch (err) {
            res.status(500).send(err)
        }
    }
}

export default EmpresaController