//Env
require('dotenv').config();
const path = require('path');
const http = require('http');

const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');


//Conection DB
const { dbConection } = require('./database/config');

// Crear el servidor express
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// CORS
app.use(cors());
app.set('socketio', io);

//app.use(express.bodyParser({ limit: '50mb' }));
// READ BODY
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// BY GILMER C.
// DataBase
dbConection();

// DIRECTORIO PUBLICO
app.use(express.static('public'));

// RUTAS
app.use('/api/v1/sensors', require('./routes/sensor.route'));


// SPA

server.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en puerto', process.env.PORT || 3000);
});