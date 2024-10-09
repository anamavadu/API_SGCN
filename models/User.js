const mongoose = require('mongoose'); // Importa el paquete de Mongoose para trabajar con bases de datos MongoDB

// Define el esquema para el modelo de usuario
const UserSchema = new mongoose.Schema({
// Campo para el nombre de usuario
    username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
},
// Campo para el correo electrónico
email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
},
// Campo para la contraseña
password: {
    type: String,
    required: true,
    minlength: 6
},
// Campo para el rol del usuario
role: {
    type: String,
    enum: ['usuario', 'admin', 'contador'],
    default: 'usuario'
}
});
// Crea el modelo 'User' basado en el esquema definido
const User = mongoose.model('User', UserSchema);

module.exports = User;