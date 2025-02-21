const express = require('express');
const router = express.Router();
const ProductoController = require('../Controllers/productoController');
const ProductoService = require('../Services/productoServices');
const ProductoRepository = require('../Repositories/productoRepository');
const { verifyToken } = require('../middleware/authMiddleware');
/*
const upload = require('../middleware/multer');
*/

const upload = require('../middleware/cloudinary').upload;

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const productoController = new ProductoController(productoService);

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Collar para perro"
 *         marca:
 *           type: string
 *           example: "Marca Ejemplo"
 *         mascota:
 *           type: string
 *           example: "Perro"
 *         edad:
 *           type: string
 *           example: "Adulto"
 *         precio:
 *           type: number
 *           format: float
 *           example: 49.99
 *         stock:
 *           type: integer
 *           example: 100
 *         idCaracteristicasExtras:
 *           type: integer
 *           example: 2
 *         imagen:
 *           type: string
 *           example: "/uploads/collar-perro.jpg"
 *       required:
 *         - id
 *         - nombre
 *         - precio
 *         - imagen
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
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
 *         description: Lista de todos los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       404:
 *         description: No se encontraron productos
 */
router.get('/productos', verifyToken, (req, res) => productoController.obtenerProductos(req, res));

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a buscar
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/productos/:id', verifyToken, (req, res) => productoController.obtenerProductoPorId(req, res));

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto con imagen
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Collar para perro"
 *               marca:
 *                 type: string
 *                 example: "Marca Ejemplo"
 *               mascota:
 *                 type: string
 *                 example: "Perro"
 *               edad:
 *                 type: string
 *                 example: "Adulto"
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 49.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/productos', verifyToken, upload.single('imagen'), (req, res) => productoController.crearProducto(req, res));

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de producto para actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Collar para perro"
 *               marca:
 *                 type: string
 *                 example: "Marca Ejemplo"
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 49.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *               imagen:
 *                 type: string
 *                 format: binary
 *       responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.put('/productos/:id', verifyToken, upload.single('imagen'), (req, res) => productoController.actualizarProducto(req, res));

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/productos/:id', verifyToken, (req, res) => productoController.eliminarProducto(req, res));

module.exports = router;
