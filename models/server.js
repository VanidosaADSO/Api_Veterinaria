const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { dbConnetion } = require('../database/config')
const fileUpload = require('express-fileupload');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuario';
        this.mascotasPath = '/api/mascota';
        this.serviciosPath = '/api/servicio';
        this.conectarDB();
        this.middlewares();
        this.routes();
        this.configureStaticFiles();

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

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.mascotasPath, require('../routes/mascota'));
        this.app.use(this.serviciosPath, require('../routes/servicio'));
    }

    configureStaticFiles() {
        this.app.use('../uploads', express.static('uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando el puerto ${this.port}`);
        });
    }
}

module.exports = Server;