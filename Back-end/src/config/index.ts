import express, { Request, Response, Express } from "express";
import cors from 'cors';
import morgan from "morgan";
import logger from "./logger";
import UserRouter from "../routes/User.Routes";
import CandidatoRouter from "../routes/Candidato.Routes";
import EmpresaRouter from "../routes/Empresa.Routes";
import VagaRouter from "../routes/Vaga.Routes";
import authRouter from "../routes/Auth.Routes";
import { validator } from "../controllers/auth.validator";

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
app.use('/users', validator)
app.use('/api/v1/candidatos', validator)
 app.use('/api/v1/empresas', validator)
app.use('/api/v1/vagas', validator)
app.use('/api/v1/validator', validator)
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/candidatos', CandidatoRouter)
app.use('/api/v1/empresas', EmpresaRouter)
app.use('/api/v1/vagas', VagaRouter)
app.use('/api/v1/auth', authRouter);
app.get('/api/v1/users', (req: Request,res: Response) => {
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