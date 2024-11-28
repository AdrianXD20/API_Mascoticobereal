const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/authMiddleware');
const Upload = require ('../middleware/multer')

const VeterinarioController= require('../Controllers/veterinariosController');
const VeterinarioService= require('../Services/veterinariosServices');
const VeterinarioRepository = require ('../Repositories/veterinariosRepository');
const upload = require('../middleware/multer');

const veterinarioRepository = new VeterinarioRepository();
const veterinariosServices = new VeterinarioService(veterinarioRepository);
const veterinariosController = new VeterinarioController(veterinariosServices);

/**
 * @swagger
 * components:
 *   schemas:
 *     Veterinario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         grado_estudio:
 *           type: string
 *           example: "Doctorado en Medicina Veterinaria"
 *         especialidad:
 *           type: string
 *           example: "Cirugía"
 *         nombre:
 *           type: string
 *           example: "Juan"
 *         apellido:
 *           type: string
 *           example: "Pérez"
 *         dni:
 *           type: string
 *           example: "12345678"
 *         email:
 *           type: string
 *           example: "juan.perez@ejemplo.com"
 *         contraseña:
 *           type: string
 *           example: "contraseña123"
 *         imagen_perfil:
 *           type: string
 *           format: binary
 *           description: Archivo de imagen para el perfil del veterinario
 *       required:
 *         - grado_estudio
 *         - especialidad
 *         - nombre
 *         - apellido
 *         - dni
 *         - email
 *         - contraseña
 */

/**
 * @swagger
 * /veterinarios:
 *   get:
 *     summary: Obtener todos los veterinarios
 *     tags: [Veterinarios]
 *     security:
 *       - bearerAuth: []
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
 *         description: Lista de todos los veterinarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veterinario'
 *       404:
 *         description: No se encontraron veterinarios
 */
router.get('/veterinarios', verifyToken, (req, res) => veterinariosController.obtenerVeterinarios(req, res));

/**
 * @swagger
 * /veterinario/{id}:
 *   get:
 *     summary: Obtener veterinario por ID
 *     tags: [Veterinarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del veterinario
 *     responses:
 *       200:
 *         description: Veterinario obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veterinario'
 *       404:
 *         description: Veterinario no encontrado
 */
router.get('/veterinario/:id', verifyToken, (req, res) => veterinariosController.obtenerVeterinarioPorId(req, res));

/**
 * @swagger
 * /veterinario/register:
 *   post:
 *     summary: Crear un nuevo veterinario
 *     tags: 
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grado_estudio:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               dni:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               imagen_perfil:
 *                 type: string
 *                 format: binary
 *                 description: (opcional) Imagen de perfil para el veterinario
 *     responses:
 *       201:
 *         description: Veterinario creado exitosamente
 *       400:
 *         description: Error en la solicitud de creación
 */
router.post('/veterinario/register', (req, res) => veterinariosController.crearVeterinario(req, res));

/**
 * @swagger
 * /veterinario/login:
 *   post:
 *     summary: Iniciar sesión un veterinario
 *     description: Endpoint para que un veterinario inicie sesión y obtenga un token de autenticación.
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
router.post('/veterinario/login', (req, res) => veterinariosController.loginVeterinario(req,res));
/**
 * @swagger
 * /veterinario/{id}:
 *   put:
 *     summary: Actualizar un veterinario
 *     tags: [Veterinarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del veterinario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               grado_estudio:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               dni:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               imagen_perfil:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Veterinario actualizado exitosamente
 *       404:
 *         description: Veterinario no encontrado
 *       400:
 *         description: Error en la solicitud de actualización
 */
router.put('/veterinario/:id', verifyToken, upload.single('imagen_perfil'), (req, res) => veterinariosController.actualizarVeterinario(req, res));

/**
 * @swagger
 * /veterinario/{id}:
 *   delete:
 *     summary: Eliminar un veterinario
 *     tags: [Veterinarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del veterinario a eliminar
 *     responses:
 *       200:
 *         description: Veterinario eliminado exitosamente
 *       404:
 *         description: Veterinario no encontrado
 */
router.delete('/veterinario/:id', verifyToken, (req, res) => veterinariosController.eliminarVeterinario(req, res));

module.exports = router;