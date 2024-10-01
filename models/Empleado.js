const mongoose = require('mongoose');
const EmpleadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    puesto: {
        type: String,
        required: true
    },
    salario: {
        type: Number,
        required: true
    },
    fechaContratacion: {
        type: Date,
        required: true
    },
    correo: {
        type: String
    },
    imagen: {
        type: String
    }
}, {
    timestamps: true // Esta línea habilita createdAt y updatedAt
});
module.exports = mongoose.model('Empleado', EmpleadoSchema);