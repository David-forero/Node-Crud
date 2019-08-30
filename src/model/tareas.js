const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    titulo: String,
    descripcion: String,
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('tareas', taskSchema); //exportamos los modulos
