const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlataformaSchema = new Schema({
    nombre : {type: String, required: true},
})

PlataformaSchema.virtual('url').get(function () {
    return `/principal/plataforma/${this._id}`
})

module.exports = mongoose.model('Plataforma', PlataformaSchema)