import { Response, Request} from 'express';
import EmpcdServices from '../services/Empcd.Service';
import Empcd from '../models/entities/Empcd';

class EmpcdController{
    private static instance: EmpcdController
    private constructor() {}

    public static Instance(): EmpcdController{
        if(!EmpcdController.instance){
            EmpcdController.instance = new EmpcdController()
        }
        return EmpcdController.instance
    }

    public async createEmpcd(req: Request, res: Response) {
        try{
            const empcdobject = req.body
            console.log(empcdobject)
            if (!empcdobject) {
                return res.status(204).send('not all data in empcd')
            }
            const savedempcd = await EmpcdServices.Instance().createEmpcdPerfil(empcdobject)
            res.send(`resquest saved whith successful ${JSON.stringify(savedempcd)}`)
            } catch (err) {
            res.status(500).send(err)
            console.log(err)
            }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const empcdget = await EmpcdServices.Instance().allEmpcd()
            res.json(empcdget)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async getEmpcdId(req: Request, res: Response) {
        try {   
            const idempcd = req.params.id
            const empcdbyid = await EmpcdServices.Instance().IdbyEmpcd(idempcd)
            console.log(empcdbyid)
            res.json(empcdbyid)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async deleteEmpcd(req: Request, res: Response) {
        try {
            const idempcd = req.params.id
        const deleteid = await EmpcdServices.Instance().deleteEmpcdId(idempcd)
        res.json(deleteid)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    
    public async updateEmpcd(req: Request, res: Response) {
        try {
            const idempcd = req.params.id
            const empcdObject = req.body
            await EmpcdServices.Instance().updateEmpcd(idempcd, empcdObject)
            res.json({ Mensagem: "Empcd already updated"})
        } catch (err) {
            res.status(500).send(err)
        }
    }
}

export default EmpcdController