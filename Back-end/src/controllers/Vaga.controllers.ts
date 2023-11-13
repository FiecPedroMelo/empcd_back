import { Response, Request } from "express";
import VagaServices from "../services/Vaga.Service";

class VagaController {
    public async createVaga(req: Request, res: Response) {
        try {
            const VagaObject = req.body;
            const Token = req.params.Token
            if (!VagaObject) {
                return res.status(204).send('Not all data in Vaga');
            }
            if (!Token) {
                return res.status(500).send(`No valid Token`);
            }
            const savedVaga = await VagaServices.Instance().createVaga(VagaObject, Token);
            res.send(savedVaga);
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async updateVaga(req: Request, res: Response) {
        try{
            const idVaga = req.params.idVaga
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
            const Token = req.params.Token
            await VagaServices.Instance().candidataVaga(idVaga, Token)
            res.json({Mensagem: "Vaga already updated"})
        } catch (err) {
            res.status(500).send(err)
        }
    }

    public async vagaSearcherEmpresa(req: Request, res: Response) {
        try {
            const Vagaget = await VagaServices.Instance().vagaSearcherEmpresa(req.params.Token)
            res.json(Vagaget)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async vagaSearcherCandidato(req: Request, res: Response) {
        try{
            const vagaSearcher = await VagaServices.Instance().vagaSearcherCandidato();
            res.json(vagaSearcher)
        } catch(err){
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async mudaStatusVaga(req: Request, res: Response) {
        try{
            const Token = req.params.Token
            const IdVaga = req.params.IdVaga
            const vaga = await VagaServices.Instance().mudaStatusVaga(Token, IdVaga);
            res.send(vaga)
        } catch(err){
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async statusVaga(req: Request, res: Response){
        try{
            const Token = req.params.Token
            const Option = req.params.Option
            const vagas = await VagaServices.Instance().statusVaga(Token, Option);
            res.status(200).send(vagas)
        } catch(err){
            res.status(500).send(err)
            console.log(err)
        }
    }

}

export default VagaController