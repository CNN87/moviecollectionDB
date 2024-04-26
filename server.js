'use strict';

// IMPORT
import express from 'express';
import routes from './routes.js';
import db from './db.js';

// VARIABLEN / KONSTANTEN

// Webserver
const server = express();

server.use(express.static('public', {
    extensions:['html']
}));

// Routen
server.use(routes);

// FUNKTIONEN
const init = () => {
    db.init().then(
        () => {
            server.listen(80, err => console.log(err || 'Server läuft'));
        }
    ).catch(
        console.warn
    )
}

init();