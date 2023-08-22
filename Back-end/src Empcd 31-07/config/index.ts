import { Request,Response } from "express";
import express, { Express } from "express";
import cors from 'cors';
import Userrouter from "../routes/User.Routes";
import Empcdrouter from "../routes/Empcd.Routes";
import { AppDataSource } from "../data-source";
import morgan from "morgan";


const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("Combinet"));

app.get('/nome',(Res:Response, Req:Request)=>{
    
    Res.send("Nome do projeto: EmPCD")
});

app.get('/dados-fake', (req: Request, res: Response) => {
    setTimeout(() => res.json([3,6,5,3,2,7,5]), 5000)
})

app.use('/users', Userrouter)

app.use('/empcd', Empcdrouter)

app.listen(3000, ()=> {
    AppDataSource.initialize()
    .then(()=>{
        console.log("banco iniciado")
    })
    .catch((err)=> console.log(err))
    console.log("Esta Rodando")
});

export default app;