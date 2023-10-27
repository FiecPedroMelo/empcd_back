import { Response, Request} from 'express';
import CandidatoLoginService from '../services/Candidato.login.Service';

class CandidatoLoginController {
    async loginCandidato(req: Request, res: Response){
        const {Email, Senha} = req.body;
        try {
            const token = await new CandidatoLoginService().loginCandidato(Email, Senha);
            res.status(200).send({token: token});
        } catch(err) {
            res.status(401).send("Login Failed");
        }
    }

    async signUpCandidato(req: Request, res: Response){
        const {NomeCompleto, Email, CPF, Telefone, Senha, Genero, Deficiencia, DataNasc, Estado, Cidade, Bairro, Formacao, ExpAnteriores, Habilidades, ImagemCandidato} = req.body;
        try {
            await new CandidatoLoginService().signUpCandidato(NomeCompleto, Email, CPF, Telefone, Senha, Genero, Deficiencia, DataNasc, Estado, Cidade, Bairro, Formacao, ExpAnteriores, Habilidades, ImagemCandidato);
            res.json('Bem criado!');
        } catch (err) {
            console.log(err);
        }
    }

    async GetIdCandidato(req: Request, res: Response) {
        try {
            const Email = req.params.Email
            const Senha = req.params.Senha
            const IdCandidato = await new CandidatoLoginService().GetIdCandidato(Email, Senha)
            console.log(IdCandidato)
            res.json(IdCandidato)
        } catch(err){
            res.status(500).send(err)
            console.log(err)
        }
    }

    async signUpCandidatosInBatch(req:Request, res:Response) {
        const newCandidato = req.file
        console.log(req)
        if (!newCandidato) {
            return res.status(403).send('error importing Candidato')
        }
        const savedCandidato = await new CandidatoLoginService().signUpCandidatosInBatch(req);
        res.json(`request saved with successful ${JSON.stringify(savedCandidato)}`);
    }

    async updateCandidatoImage(req:Request, res:Response) {
        console.log(req.file);
        await new CandidatoLoginService().updateCandidatoImage(req);
        res.json('files');
    }
}

export default CandidatoLoginController;