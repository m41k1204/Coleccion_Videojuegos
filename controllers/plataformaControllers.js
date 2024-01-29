const Plataforma = require('../models/Plataforma');
const Videojuego = require('../models/Videojuego');
const asyncHandler = require('express-async-handler');

exports.plataforma_detalles = asyncHandler(async (req, res, next) => {
    try {
        // Retrieve the platform details based on the id parameter
        const plataforma = await Plataforma.findById(req.params.id);

        if (!plataforma) {
            return res.status(404).send('Platform not found');
        }

        const videojuegos = await Videojuego.find({ plataforma: plataforma.nombre }).populate("desarrolladora").exec();
        

        // Render the 'plataforma' view with the platform details
        res.render('plataforma', {
            title: `${plataforma.nombre}`,
            plataforma: plataforma,
            videojuegos: videojuegos,
        });
        
    } catch (error) {
        // Handle any errors that may occur during the database query
        next(error);
    }
});
