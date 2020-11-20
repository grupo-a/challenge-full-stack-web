import {Application} from 'express';
import cors = require('cors');
import compression = require('compression');
import {json, urlencoded} from 'body-parser';

export class ServerConfig {

    static forRoot(app: Application) {
        app.disable('x-powered-by');
        app.use(cors())
        app.use(compression())
        app.use(json())
        app.use(urlencoded({ extended: false }))
    }

}