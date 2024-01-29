const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideojuegoSchema = new Schema({
    desarrolladora: { type: Schema.Types.ObjectId, ref: "Desarrolladora", required: true },
    nombre: { type: String, required: true },
    generos: [{ type: String, required: true }],
    plataforma: {type: String, required: true},
})

VideojuegoSchema.virtual('url').get(function () {
    return `/principal/videojuegos/${this._id}`
})

module.exports = mongoose.model('Videojuego', VideojuegoSchema);