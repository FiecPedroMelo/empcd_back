import express, { Request, Response, Express } from "express";
import cors from 'cors';
import { AppDataSource } from "../data-source";
import morgan from "morgan";
import Userrouter from "../routes/User.Routes";
import Candidatorouter from "../routes/Candidato.Routes";
import Empresarouter from "../routes/Empresa.Routes";
import Vagarouter from "../routes/Vaga.Routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("Combinet"));

app.get('/nome',(Res:Response, Req:Request)=>{
    Res.send("Nome do projeto: Candidato")
});

app.get('/dados-fake', (req: Request, res: Response) => {
    setTimeout(() => res.json([3,6,5,3,2,7,5]), 5000)
})

app.use('/users', Userrouter)

app.use('/candidatos', Candidatorouter)

app.use('/empresas', Empresarouter)

app.use('/vagas', Vagarouter)


export default app;