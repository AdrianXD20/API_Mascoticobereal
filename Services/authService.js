const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const secretKey = process.env.secretKey;

class UserService {
  constructor() {}

  async crearUsuario(nuevoUsuario) {
    try {
      
      const hashedPassword = await bcrypt.hash(nuevoUsuario.contraseña, 10);
      nuevoUsuario.contraseña = hashedPassword;

      
      const usuarioCreado = await User.create(nuevoUsuario);
      return usuarioCreado;
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  }

  async login(email, contraseña) {
    try {
      
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      
      const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
      if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
      }

    
      const JWT = jwt.sign(
        { id: user.id, email: user.email, nombre: user.nombre },
        secretKey,
        { expiresIn: '1h' }
      );

      return { JWT, user };
    } catch (error) {
      throw new Error('Error en el proceso de login: ' + error.message);
    }
  }
}

module.exports = UserService;

