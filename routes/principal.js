const express = require('express');
const router = express.Router();

const controller_desarrolladora = require('../controllers/desarrolladoraControllers')
const controller_plataforma = require('../controllers/plataformaControllers')
const controller_videojuego = require('../controllers/videojuegosControllers')
const controller_auth = require('../controllers/authenticationControllers')


// Routes de las desarrolladoras 

router.get('/', controller_desarrolladora.index);

router.get('/desarrolladora/crear', controller_desarrolladora.desarrolladora_create_get)

router.post('/desarrolladora/crear', controller_desarrolladora.desarrolladora_create_post)

router.get('/desarrolladora/:id/eliminar', controller_desarrolladora.desarrolladora_delete_get)

router.post('/desarrolladora/:id/eliminar', controller_desarrolladora.desarrolladora_delete_post)

router.get('/desarrolladora/:id/actualizar', controller_desarrolladora.desarrolladora_update_get)

router.post('/desarrolladora/:id/actualizar', controller_desarrolladora.desarrolladora_update_post)

router.get('/desarrolladora/:id', controller_desarrolladora.desarrolladora_detalles)

router.get('/desarrolladora', controller_desarrolladora.desarrolladora_lista)

// Routers de las plataformas

router.get('/plataforma/:id', controller_plataforma.plataforma_detalles)

// Routers de los videojuegos

router.get('/videojuego/crear', controller_videojuego.videojuegos_crear_get)

router.post('/videojuego/crear', controller_videojuego.videojuegos_crear_post)

router.get('/videojuego/:id/eliminar', controller_videojuego.videojuegos_delete_get)

router.post('/videojuego/:id/eliminar', controller_videojuego.videojuegos_delete_post)

router.get('/videojuego/:id/actualizar', controller_videojuego.videojuegos_actualizar_get)

router.post('/videojuego/:id/actualizar', controller_videojuego.videojuegos_actualizar_post)

// Routers para iniciar sesion

router.get('/appid/login', controller_auth.login)

router.get('/appid/callback', controller_auth.callback)




module.exports = router

