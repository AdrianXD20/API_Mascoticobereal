const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/cloudinary').upload;

const authService = require('../Services/authService.js');
const UsuarioController= require ('../Controllers/usuarioController.js');
const UserRepository = require('../Repositories/UserRepository.js');
const { verifyToken } = require('../middleware/authMiddleware.js');


const userRepository = new UserRepository();
const userService = new authService(userRepository);
const userController = new UsuarioController(userService)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     description: Endpoint para registrar un nuevo usuario en la aplicación.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - email
 *               - contraseña
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario (debe ser único)
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario (mínimo 6 caracteres)
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario registrado
 *                 apellido:
 *                   type: string
 *                   description: Apellido del usuario registrado
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario registrado
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Descripción del error
 *       500:
 *         description: Error en el servidor
 */
router.post('/register',upload.single('imagen_perfil'),(req,res) => userController.crearUsuario(req,res));

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión un usuario.
 *     description: Endpoint para que un usuario inicie sesión y obtenga un token de autenticación.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contraseña
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo del usuario
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación JWT
 *       400:
 *         description: Error en las credenciales o en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post('/login',(req,res)=> userController.login(req,res));

  /**
 * @swagger
 * /recuperar:
 *   post:
 *     summary: Solicitar recuperación de contraseña.
 *     description: Envía un correo con un enlace para restablecer la contraseña del usuario.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario registrado
 *     responses:
 *       200:
 *         description: Se envió el correo de recuperación exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje confirmando el envío del correo
 *       400:
 *         description: Error en la solicitud (correo no registrado o inválido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error en el servidor
 */
  router.post('/recuperar', async (req, res) => {
    const { email } = req.body;
    const response = await userService.solicitarRecuperacion(email);
    res.json(response);
  });
/**
 * @swagger
 * /resetear:
 *   post:
 *     summary: Restablecer contraseña.
 *     description: Permite al usuario restablecer su contraseña usando un token de recuperación.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - nuevaContraseña
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperación enviado al usuario
 *               nuevaContraseña:
 *                 type: string
 *                 description: Nueva contraseña del usuario (mínimo 6 caracteres)
 *     responses:
 *       200:
 *         description: Contraseña restablecida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *       400:
 *         description: Error en la solicitud (token inválido o expirado)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error en el servidor
 */
 // Ruta para restablecer la contraseña
 router.post('/resetear', async (req, res) => {
    const { token, nuevaContraseña } = req.body;
    const response = await userService.resetearPassword(token, nuevaContraseña);
    res.json(response);
  });




  /**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido:
 *           type: string
 *           description: Apellido del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         contraseña:
 *           type: string
 *           description: Contraseña del usuario (encriptada)
 *         rol:
 *           type: string
 *           description: Rol del usuario (por defecto 'usuario')
 *         resetToken:
 *           type: string
 *           description: Token de reseteo de contraseña (opcional)
 *         imagen_perfil:
 *           type: string
 *           description: URL de la imagen de perfil del usuario
 *       example:
 *         id: 1
 *         nombre: "Juan"
 *         apellido: "Perez"
 *         email: "juan@example.com"
 *         contraseña: "$2b$10$abcde12345"
 *         rol: "usuario"
 *         resetToken: null
 *         imagen_perfil: "https://example.com/profile.jpg"
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página (por defecto es 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de registros por página (por defecto es 10)
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
  router.get('/usuarios',(req,res)=> userController.obtenerUsuario(req,res))

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */
  router.get('/usuario/:id', (req,res)=> userController.obtenerUsuarioId(req,res))

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID con foto
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo del usuario
 *               imagen_perfil:
 *                 type: string
 *                 format: binary
 *                 description: Foto de perfil del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Usuario no encontrado
 */
  router.put('/usuario/:id', upload.single('imagen_perfil') , (req,res)=> userController.actualizarUsuario(req,res))
/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
  router.delete('/usuario/:id', (req,res)=> userController.eliminarUsuario(req,res))
  
  module.exports = router;
