const Empleado = require('../models/Empleado');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path'); // Asegúrate de importar 'path'

const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadsDir = path.join(__dirname, '../uploads'); // Usar path.join para asegurar compatibilidad SO
            cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'));
        }
    }
};

const upload = multer(configuracionMulter).single('imagen');

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error.message });
        }
        return next();
    });
};
exports.nuevoEmpleado = async (req, res, next) => {
    const empleado = new Empleado(req.body);
    try {
        if (req.file) {
            empleado.imagen = req.file.filename;
        }
        await empleado.save();
        res.json({ mensaje: 'Se agregó un nuevo empleado' });
    } catch (error) {
        console.log(error);
        next();
    }
};
exports.mostrarEmpleados = async (req, res, next) => {
    try {
        const empleados = await Empleado.find({});
        res.json(empleados);
    } catch (error) {
        console.log(error);
        next();
    }
};
exports.mostrarEmpleado = async (req, res, next) => {
    try {
        const empleado = await Empleado.findById(req.params.idEmpleado);
        if (!empleado) {
            res.json({ mensaje: 'Ese Empleado no existe' });
            return next();
        }
        res.json(empleado);
    } catch (error) {
        console.log('Error al buscar el empleado:', error);
        next();
    }
};
exports.actualizarEmpleado = async (req, res, next) => {
    try {
        let nuevoEmpleado = req.body;
        if (req.file) {
            nuevoEmpleado.imagen = req.file.filename;
        } else {
            let empleadoAnterior = await Empleado.findById(req.params.idEmpleado);
            nuevoEmpleado.imagen = empleadoAnterior.imagen;
        }
        let empleado = await Empleado.findOneAndUpdate({ _id: req.params.idEmpleado }, nuevoEmpleado, {
            new: true
        });
        res.json(empleado);
    } catch (error) {
        console.log(error);
        next();
    }
};
exports.eliminarEmpleado = async (req, res, next) => {
    try {
        await Empleado.findByIdAndDelete({ _id: req.params.idEmpleado });
        res.json({ mensaje: 'El Empleado se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
};
exports.buscarEmpleado = async (req, res, next) => {
    try {
        const { query } = req.params;
        const empleado = await Empleado.find({ nombre: new RegExp(query, 'i') });
        res.json(empleado);
    } catch (error) {
        console.log(error);
        next();
    }
};
