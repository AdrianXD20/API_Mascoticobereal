const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
require('dotenv').config();

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
        { id: user.id, email: user.email, nombre: user.nombre,rol:user.rol},
        secretKey,
        { expiresIn: '1h' }
      );

      return { JWT, user };
    } catch (error) {
      throw new Error('Error en el proceso de login: ' + error.message);
    }
  }

  async resetearPassword(token, nuevaContraseña) {
    const user = await User.findOne({ where: { resetToken: token } });

    if (!user || user.resetTokenExpira < new Date()) return null; // Token inválido o expirado

    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
    await user.update({ contraseña: hashedPassword, resetToken: null, resetTokenExpira: null });

    return { message: 'Contraseña actualizada correctamente' };
  }

  async solicitarRecuperacion(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) return { message: 'Si el email existe, se enviará un correo' }; // No revelar si el usuario existe o no
  
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpira = new Date(Date.now() + 3600000);
  
    await user.update({ resetToken: token, resetTokenExpira: tokenExpira });
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { 
        user: process.env.email, 
        pass: process.env.email_password 
      }
    });
  
    const mailOptions = {
      from: process.env.email,
      to: user.email,
      subject: 'Recuperación de contraseña',
      text: `Usa el siguiente enlace para restablecer tu contraseña: http://tudominio.com/reset-password?token=${token}`
    };
  
    try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado: ', info.response);
      return { message: 'Correo enviado correctamente' };
    } catch (error) {
      console.error('Error al enviar correo: ', error);
      return { error: 'No se pudo enviar el correo' };
    }
  }

  async obtenerUsuarios(page, limit){
    const offset = (page - 1) * limit;
    return User.findAll({limit, offset})
  }

  async obtenerUsuarioId(Id,){
    return User.findByPk(Id);
  }

  async actualizarUsuario(Id, datosActualizados, imagen= null){
    const users = await User.findByPk(Id);
    if(users){
      if(imagen){
        datosActualizados.imagen = imagen;
      }
      const update = await User.update(datosActualizados,{
        where: {id:Id}
      });
      if (update > 0) {
        return User.findByPk(Id)
        
      };
      
    }
    return null
  }

  async eliminarUsuarios(Id){
    const users = await User.findByPk(Id)
    if(users){
      return User.destroy({
        where:{id:Id}
      })
    }
    return null
  }
  

}

module.exports = UserService;

