const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { dbConnetion } = require('../database/config')


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuario';
        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB() {
        await dbConnetion();
    }

    middlewares() {
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));
        this.app.use(express.json());

        this.app.use(cors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        }));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuario'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando el puerto ${this.port}`);
        });
    }
}

module.exports = Server;