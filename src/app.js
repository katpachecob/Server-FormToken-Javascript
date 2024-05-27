const express = require('express');
const morgan = require('morgan');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();


//Habilitar bloqueo de CORS
const cors = require('cors');
app.use(cors());

//Confiuguracion del puerto
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const server = app.listen(process.env.PORT || 8000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
});


//Rutas de conexion
app.use('/CreatePayment',require('./routes/formtoken.js'));

