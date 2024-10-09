const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');

// Nuevos empleados
router.post('/empleados', 
    empleadosController.subirArchivo,
    empleadosController.nuevoEmpleado
);
// Muestra todos los empleados
router.get('/empleados', 
    empleadosController.mostrarEmpleados
);

// Muestra un empleado específico por su ID
router.get('/empleados/:idEmpleado', 
    empleadosController.mostrarEmpleado
);
// Actualizar empleados
router.put('/empleados/:idEmpleado', 
    empleadosController.subirArchivo,
    empleadosController.actualizarEmpleado
);
// Eliminar empleados
router.delete('/empleados/:idEmpleado', 
    empleadosController.eliminarEmpleado
);
// Búsqueda de empleados
router.post('/empleados/busqueda/:query',
    empleadosController.buscarEmpleado);
module.exports = router;