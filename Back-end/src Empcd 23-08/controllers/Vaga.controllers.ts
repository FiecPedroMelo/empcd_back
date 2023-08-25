import { Response, Request } from "express";
import VagaServices from "../services/Vaga.Service";

class VagaController {
    public async createVaga(req: Request, res: Response) {
        try {
            const VagaObject = req.body;
            console.log(VagaObject);
            if (!VagaObject) {
                return res.status(204).send('Not all data in Vaga');
            }
            const savedVaga = await VagaServices.Instance().createVaga(VagaObject)
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
}

export default VagaController