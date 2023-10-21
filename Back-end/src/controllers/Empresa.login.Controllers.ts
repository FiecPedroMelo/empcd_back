import { Response, Request} from 'express';
import EmpresaLoginService from '../services/Empresa.login.Service';

class EmpresaLoginController {
    async loginEmpresa(req: Request, res: Response){
        const {Email, Senha} = req.body;
        try {
            const token = await new EmpresaLoginService().loginEmpresa(Email, Senha);
            res.status(200).send({token: token});
        } catch(err) {
            res.status(401).send("Login Failed");
        }
    }

    async signUpEmpresa(req: Request, res: Response){
        const {RazaoSocial, NomeFantasia, Email, Site, Senha, CNPJ, Cidade, Bairro, UF, ImagemEmpresa} = req.body;
        try {
            await new EmpresaLoginService().signUpEmpresa(RazaoSocial, NomeFantasia, Email, Site, Senha, CNPJ, Cidade, Bairro, UF, ImagemEmpresa);
            res.json('Bem criado!');
        } catch (err) {
            console.log(err);
        }
        
    }

    async signUpEmpresasInBatch(req:Request, res:Response) {
        const newEmpresa = req.file
        console.log(req)
        if (!newEmpresa) {
            return res.status(403).send('error importing Empresa')
        }
        const savedEmpresa = await new EmpresaLoginService().signUpEmpresasInBatch(req);
        res.json(`request saved with successful ${JSON.stringify(savedEmpresa)}`);
    }

    async updateEmpresaImage(req:Request, res:Response) {
        console.log(req.file);
        await new EmpresaLoginService().updateEmpresaImage(req);
        res.json('files');
    }
}

export default EmpresaLoginController;