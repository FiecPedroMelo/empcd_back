import { Response, Request} from 'express';
import CandidatoServices from '../services/Candidato.Service';
import Candidato from '../models/entities/Candidato';
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
        const {NomeCompleto, Email, Senha, Telefone, CPF, DataNasc, Endereco, Formacao, ExpProfissional, Deficiencia, Cep} = req.body;
        try {
            await new CandidatoLoginService().signUpCandidato(NomeCompleto, Email, Senha, Telefone, CPF, DataNasc, Endereco, Formacao, ExpProfissional, Deficiencia, Cep);
            res.json('Bem criado!');
        } catch (err) {
            console.log(err);
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
}

export default CandidatoLoginController;