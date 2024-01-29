const Desarrolladora = require('../models/Desarrolladora');
const Videojuego = require('../models/Videojuego');
const Plataforma = require('../models/Plataforma');
const { body, validationResult } = require("express-validator");

const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    const nombresPlataformas = res.locals.nombresPlataformas;
    
    res.render('principal', {
        title: 'Coleccion de Videojuegos',
        nombresPlataformas: nombresPlataformas,
    });
});


exports.desarrolladora_lista = asyncHandler(async (req, res, next) => {
    const lista_desarrolladoras = await Desarrolladora.find().exec()

    console.log(lista_desarrolladoras)
    
    res.render('desarrolladoras', {
        title: 'Desarrolladoras',
        lista_desarrolladoras: lista_desarrolladoras,
    }); 
})

exports.desarrolladora_detalles = asyncHandler(async (req, res, next) => {
    try {
        const desarrolladora = await Desarrolladora.findById(req.params.id);
        const lista_videojuegos = await Videojuego.find().populate("desarrolladora")
        console.log(lista_videojuegos)
        if (!Desarrolladora) {
            return res.status(404).send('Desarrolladora no fue encontrada');
        }
    
        res.render('desarrolladora', {
            title: `${desarrolladora.nombre}`,
            desarrolladora: desarrolladora,
        })

    } catch (error) {
        next(error);
    }
})

exports.desarrolladora_create_get = (req, res, next) => {
    res.render('desarrolladora_form', {title: "Crear Desarrolladora" });
}

exports.desarrolladora_create_post = asyncHandler(async (req, res, next) => {
    res.send(`Todavia no impledentado : Desarrolladora create POST`)
})

exports.desarrolladora_delete_get = asyncHandler(async (req, res, next) => {
    res.send(`Todavia no implementado : Delete Desarrolladora GET`)
})

exports.desarrolladora_delete_post = asyncHandler(async (req, res, next) => {
    res.send(`Todavia no implementado : Delete Desarrolladora POST`)
})
exports.desarrolladora_update_get = asyncHandler(async (req, res, next) => {
    res.send(`Todavia no implementado : Actualizar Desarrolladora GET`)
})

exports.desarrolladora_update_post = asyncHandler(async(req, res, next) => {
    res.send(`Todavia no implementado : Actualizar Desarrolladora POST`)
})