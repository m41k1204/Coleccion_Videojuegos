// middleware.js
const Plataforma = require('../models/Plataforma');

const fetchCommonData = async (req, res, next) => {
    try {
        const plataformas = await Plataforma.find({}, 'nombre').exec();
        const nombresPlataformas = plataformas.map(plataforma => plataforma.nombre);

        // Attach the data to res.locals for access in templates
        res.locals.nombresPlataformas = nombresPlataformas;
        res.locals.plataformas = plataformas;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { fetchCommonData };
