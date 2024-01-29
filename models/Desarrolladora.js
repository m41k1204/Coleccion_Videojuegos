const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DesarrolladoraSchema = new Schema({
    nombre : {type: String, required: true, minLenght: 2, maxLength : 50 },
    pais : {type: String},
    link : {type: String}
})

DesarrolladoraSchema.virtual("url").get(function () {
    return `/principal/desarrolladora/${this._id}`
})

module.exports = mongoose.model('Desarrolladora', DesarrolladoraSchema)