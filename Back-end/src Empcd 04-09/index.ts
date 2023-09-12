import http from 'http';
import app from './config';
import { AppDataSource } from './data-source';

const PORT = 38000;

const server = http.createServer({}, app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // console.log("SSL is enabled");
    AppDataSource.initialize()
        .then(() => {
            console.log("Banco ok");
        })
        .catch((error) => console.log(error));
    console.log("Servidor ok");
});