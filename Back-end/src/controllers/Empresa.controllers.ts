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
    } //ok

    public async getAll(req: Request, res: Response){
        try {
            const Empresaget = await EmpresaServices.Instance().allEmpresa()
            res.json(Empresaget)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    } //ok

    public async EmpresaById(req: Request, res: Response) {
        try {
            const Token = req.params.Token
            const Empresabyid = await EmpresaServices.Instance().EmpresaById(Token)
            res.json(Empresabyid)
        } catch (err) { 
            res.status(500).send(err)
            console.log(err)
        }
    } //ok

    public async deleteEmpresa(req: Request, res: Response) {
        try {
            const Token = req.params.Token
            const deleteid = await EmpresaServices.Instance().deleteEmpresaId(Token)
            res.json(deleteid)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    public async updateEmpresa(req: Request, res: Response) {
        try {
            const Token = req.params.Token
            const EmpresaObject = req.body
            await EmpresaServices.Instance().updateEmpresa(Token, EmpresaObject)
            res.json({ Mensagem: "Empresa already updated"})
        } catch (err) {
            res.status(500).send(err)
        }
    }


    public async getRelatorio(req: Request, res:Response){
        try{
            const Token = req.params.Token
            const idVaga = req.params.idVaga
            const relatorio = await EmpresaServices.Instance().getRelatorio(Token,idVaga);
            res.send(relatorio)
        }catch(err){
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async getCandidatoId(req: Request, res: Response) {
        try {   
            const IdCand = req.params.IdCand
            const Candidatobyid = await EmpresaServices.Instance().IdbyCandidato(IdCand)
            res.json(Candidatobyid)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

}

export default EmpresaController