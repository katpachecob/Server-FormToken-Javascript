const express = require('express');
const morgan = require('morgan');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();


//Habilitar bloqueo de CORS
const cors = require('cors');
const lista= ['http://localhost:5000','https://prueba55.herokuapp.com','http://127.0.0.1:5500'];
app.use(cors({origin: lista}));

//Confiuguracion del puerto
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});


//Rutas de conexion
app.use('/CreatePayment',require('./routes/formtoken.js'));

