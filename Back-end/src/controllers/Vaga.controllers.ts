import { Response, Request } from "express";
import VagaServices from "../services/Vaga.Service";

class VagaController {
    public async createVaga(req: Request, res: Response) {
        try {
            const VagaObject = req.body;
            const idEmpresa = req.params.idEmpresa
            if (!VagaObject) {
                return res.status(204).send('Not all data in Vaga');
            }
            if (!idEmpresa) {
                return res.status(500).send(`No valid Id`);
            }
            const savedVaga = await VagaServices.Instance().createVaga(VagaObject, idEmpresa);
            res.send(`request saved with succesful ${JSON.stringify(savedVaga)}`)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async updateVaga(req: Request, res: Response) {
        try{
            const idVaga = req.params.id
            const VagaObject = req.body
            await VagaServices.Instance().updateVaga(idVaga, VagaObject)
            res.json({Mensagem: "Vaga already updated"})
        } catch (err) {
            res.status(500).send(err)
        }
    }

    public async getVagas(req: Request, res: Response) {
        try {
            const Vagaget = await VagaServices.Instance().getVaga()
            res.json(Vagaget)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async getVagaById(req: Request, res: Response) {
        try {   
            const idVaga = req.params.idVaga
            const Vagabyid = await VagaServices.Instance().getVagaById(idVaga)
            console.log(Vagabyid)
            res.json(Vagabyid)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async candidataVaga(req: Request, res: Response) {
        try{
            const idVaga = req.params.idVaga
            const idCand = req.params.idCand
            await VagaServices.Instance().candidataVaga(idVaga, idCand)
            res.json({Mensagem: "Vaga already updated"})
        } catch (err) {
            res.status(500).send(err)
        }
    }

    public async vagaSearcherEmpresa(req: Request, res: Response) {
        try {
            const Vagaget = await VagaServices.Instance().vagaSearcherEmpresa(req.params.NomeFantasia)
            res.json(Vagaget)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

}

export default VagaController