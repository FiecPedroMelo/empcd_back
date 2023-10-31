import { Response, Request} from 'express';
import CandidatoServices from '../services/Candidato.Service';

class CandidatoController{

    public async createCandidato(req: Request, res: Response) {
        try{
            const Candidatoobject = req.body
            console.log(Candidatoobject)
            if (!Candidatoobject) {
                return res.status(204).send('not all data in Candidato')
            }
            const savedCandidato = await CandidatoServices.Instance().createCandidatoPerfil(Candidatoobject)
            res.send(`resquest saved whith successful ${JSON.stringify(savedCandidato)}`)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const Candidatoget = await CandidatoServices.Instance().allCandidato()
            res.json(Candidatoget)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async getCandidatoId(req: Request, res: Response) {
        try {   
            const Token = req.params.Token
            const Candidatobyid = await CandidatoServices.Instance().IdbyCandidato(Token)
            res.json(Candidatobyid)
        } catch (err) {
            res.status(500).send(err)
            console.log(err)
        }
    }

    public async deleteCandidato(req: Request, res: Response) {
        try {
            const Token = req.params.Token
        const deleteid = await CandidatoServices.Instance().deleteCandidatoId(Token)
        res.json(deleteid)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    
    public async updateCandidato(req: Request, res: Response) {
        try {
            const Token = req.params.Token
            const CandidatoObject = req.body
            await CandidatoServices.Instance().updateCandidato(Token, CandidatoObject)
            res.json({ Mensagem: "Candidato already updated"})
        } catch (err) {
            res.status(500).send(err)
        }
    }

    
}

export default CandidatoController