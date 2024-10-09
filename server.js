const express = require('express');
const conectarDB = require('./config/db');
const authRoutes = require('./routes/authRoutes.js');
const empleadosRoutes = require('./routes/empleadosRoutes');
const salariosRoutes = require('./routes/salariosRoutes');

// Conectar a la base de datos
conectarDB();

// Crear una instancia de Express
const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

//Rutas de empleados
app.use('/api', empleadosRoutes);

// Rutas de salarios
app.use('/api', salariosRoutes);

// Configurar el puerto en el que escuchará el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando y ejecutándose en el puerto ${PORT}`);
});