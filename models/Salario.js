const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salarioSchema = new Schema({
    gestor: {
        type: Schema.ObjectId,
        ref: 'User',  // El responsable que genera la nómina
        required: true
    },
    salario: [{
        empleado: {
            type: Schema.ObjectId,
            ref: 'Empleado',  // Referencia al modelo Empleado
            required: true
        },
        horasTrabajadas: {
            type: Number,
            required: true
        }
    }],
    totalSalarios: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['PENDIENTE', 'PAGADO'],  // Estado del pago
        default: 'PENDIENTE'
    },
    //Datos del pago
    fechaPago: {
        type: Date,
        required: true
    },
    nombrePago: {
        type: String,
        required: true
    },
    codigoPago: {
        type: Number,
        required: true
    }
    
}, {
    timestamps: true  // Para tener campos createdAt y updatedAt
});

module.exports = mongoose.model('Salario', salarioSchema);