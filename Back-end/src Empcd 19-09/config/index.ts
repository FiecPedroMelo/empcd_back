import express, { Request, Response, Express } from "express";
import cors from 'cors';
import morgan from "morgan";
import logger from "./logger";

import Userrouter from "../routes/User.Routes";
import Candidatorouter from "../routes/Candidato.Routes";
import Empresarouter from "../routes/Empresa.Routes";
import Vagarouter from "../routes/Vaga.Routes";
import { validator } from "../controllers/auth.validator";
import authRouter from "../routes/auth.router.";

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("Combinet"));

app.get('/nome',(Res:Response, Req:Request)=>{
    logger.info("test request");
    Res.json("Nome do projeto: Candidato");
});

app.get('/dados-fake', (req: Request, res: Response) => {
    setTimeout(() => res.json([3,6,5,3,2,7,5]), 5000)
})

//app.use('/users', validator)
app.use('/users', Userrouter)
app.use('/candidatos', validator)
app.use('/candidatos', Candidatorouter)
//app.use('/empresas', validator)
app.use('/empresas', Empresarouter)
//app.use('/vagas', validator)
app.use('/vagas', Vagarouter)
app.use('/auth', authRouter);
app.get('/users', (req: Request,res: Response) => {
    res.json([])
})
app.get('/candidatos', (req: Request,res: Response) => {
    res.json([])
})
app.get('/empresas', (req: Request,res: Response) => {
    res.json([])
})
app.get('/vagas', (req: Request,res: Response) => {
    res.json([])
})



export default app;