import express from "express";
import routes from "./routes";

import './database/initMongoDB';

class App {
    constructor(){
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json({limit: '10mb'}));
        this.server.use(express.urlencoded({limit: '10mb'}));
        this.server.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitações de qualquer domínio
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos HTTP permitidos
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
            next();
        });
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;