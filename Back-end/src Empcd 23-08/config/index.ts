import express, { Request, Response, Express } from "express";
import cors from 'cors';
import morgan from "morgan";
import Userrouter from "../routes/User.Routes";
import Candidatorouter from "../routes/Candidato.Routes";
import Empresarouter from "../routes/Empresa.Routes";
import Vagarouter from "../routes/Vaga.Routes";
import authRouter from "../routes/auth.router";
import { validator } from "../controllers/auth.validator";
import logger from "./logger";

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("Combined"));

app.get('/nome',(Res:Response, Req:Request)=>{
    logger.info("Testando request name")
    Res.send("Nome do projeto: Candidato")
});

app.get('/dados-fake', (req: Request, res: Response) => {
    setTimeout(() => res.json([3,6,5,3,2,7,5]), 5000)
})

app.use('/users', validator)
app.use('/auth', validator)
app.use('/users', Userrouter)
app.use('/candidatos', Candidatorouter)
app.use('/empresas', Empresarouter)
app.use('/vagas', Vagarouter)


export default app;