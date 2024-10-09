const Salario = require('../models/Salario');

// Crea una nueva nómina
exports.nuevoSalario = async (req, res, next) => {
    const salario = new Salario(req.body);
    try {
        await salario.save();
        res.json({ mensaje: 'Se agregó una nueva nómina' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Muestra todas las nóminas
exports.mostrarSalarios = async (req, res, next) => {
    try {
        const salarios = await Salario.find({})
            .populate('gestor', '-password')
            .populate('salario.empleado');
        res.json(salarios);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra una nómina por su ID
exports.mostrarSalario = async (req, res, next) => {
    try {
        const salario = await Salario.findById(req.params.idSalario)
            .populate('salario.empleado', '-password');
        if (!salario) {
            res.json({ mensaje: 'Esa nómina no existe' });
            return next();
        }
        res.json(salario);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Actualizar una nómina por ID
exports.actualizarSalario = async (req, res, next) => {
    try {
        const salario = await Salario.findOneAndUpdate(
            { _id: req.params.idSalario }, 
            req.body, 
            { new: true }
        ).populate('salario.empleado', '-password');
        res.json(salario);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Elimina una nómina por su ID
exports.eliminarSalario = async (req, res, next) => {
    try {
        await Salario.findByIdAndDelete(req.params.idSalario);
        res.json({ mensaje: 'La nómina se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};