const { Router } = require("express");
const router = Router();
const request = require('request');

//Ruta de las credenciales de conexión
const keys = require("../data/keys_Authentication");

const username = keys.username;        // USUARIO
const password = keys.password         // CONTRASEÑA API REST
const endpoint = keys.endpoint         // SERVIDOR

/*************************SE GENERA EL TOKEN DE AUTENTICACIÓN*************************/
const auth = 'Basic ' + new Buffer.from(username + ':' + password).toString('base64');    
/*************************************************************************************/

router.post('/', function(req, res, next) 
{
  var order = req.body;
  
  if(isEmptyObject(order) === true || isEmptyObject(order) === 'undefined'){
      order = {
        "amount":   200,
        "currency": "PEN",
        "orderId":  "myOrderId-999999",
        "customer": {
            "email": "sample@example.com"
        },
        
        /************************************************************************/
        /*Se envia "0" si no quieres que se visualice las cuotas y pago diferido*/
        /************************************************************************/
        /*      "transactionOptions": {                                         */
        /*          "cardOptions": {                                            */
        /*              "installmentNumber": 0                                  */
        /*          }                                                           */
        /*      }                                                               */
        /************************************************************************/
      };    
  }
  else{
    order = req.body;
  } 

  //comprueba si el body esta vacio, devuelve true si esta vacio
  function isEmptyObject(obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            return false;
        }
    }
 
    return true;
  }

  // Llama al servicio web CreatePayment, para crear el token del formulario
  request.post({
    url: `${endpoint}/api-payment/V4/Charge/CreatePayment`,
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    json: order
  }, 
  function(error, response, body) {

    if (body.status === 'SUCCESS')
    {
      //Devuelve el token de formulario al lado del cliente
      const formtoken = body.answer.formToken;
      res.send(formtoken);
    }
    else
    {
      //Haz tu propio manejo de errores 
      console.error(body);
      res.status(500).send('error');
    }  
     
  });
});

module.exports = router;