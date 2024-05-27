/*Ingresar Valores del Back Office Vendedor, ruta: Configuraion -> Tienda -> Claves de API REST*/

/*
  Si no tiene una cuenta Izipay puede utilizar
  Credenciales de prueba extraidas desde la pagina web "MI CUENTA WEB"
  Web: https://secure.micuentaweb.pe/doc/es-PE/rest/V4.0/api/get_my_keys.html
*/

const keys = {    
    "username"   : process.env.username,
    "password"   : process.env.password,
    "endpoint"   : "https://api.micuentaweb.pe",
    "publickey"  : process.env.publickey,
    "HMACSHA256" : process.env.HMACSHA256
}

module.exports =  keys