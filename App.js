const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const body = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const specs = require('./swagger/swagger.js');
const env = require('dotenv').config();

const authController = require('./routes/authController.js'); 
const userController = require('./Controllers/userController'); 

const productoRoutes = require('./routes/productoRoutes.js')
const mascotasRoutes = require('./routes/mascotasRoutes.js')
const citasRoutes = require('./routes/citaRoutes.js')
const veterinarioRoutes = require('./routes/veterinariodRoutes.js')
const extraRoutes = require('./routes/extraRoutes.js')
const ventasRoutes = require('./routes/ventasRoutes.js')
const blogsRoutes= require('./routes/blogsRoutes.js')
const disponibilidadRoutes = require('./routes/disponibilidadRoutes.js')


const allowed = [
    'https://AdrianXD20.github.io', 
    'http://127.0.0.1:5501',
    'http://127.0.0.1:5500', 
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'https://api-mascoticos.onrender.com',
    'https://api-mascoticobereal.onrender.com',
    'CC-15-31-A0-5D-75',
    'CC-15-31-A0-5D-76',/*IP de Alexander*/
    'http://192.168.0.104:8081',/*IP de Frenks*/
    'https://mascotico-luna.vercel.app',/*MascoTico WEB*/
    'https://mascotico-luna-pjzx81ixt-alexyah064s-projects.vercel.app/', /*Front de Admin */
    'https://mascotico-web.vercel.app',
    'mysql://uq92kg8809ftify2:GzKZ4C98MmKvQvv32tP1@bpdddt3swjtee4chka49-mysql.services.clever-cloud.com:3306/bpdddt3swjtee4chka49%20Host%20bpdddt3swjtee4chka49-mysql.services.clever-cloud.com'
];

app.use(cors({
    origin: function (origin, callback) {
        if (allowed.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use("/docs", swaggerUI.serve,swaggerUI.setup(specs))
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('images')); 
app.use(body.urlencoded({ extended: false }));
app.use(body.json()); 


app.use('/',productoRoutes)
app.use('/',mascotasRoutes)
app.use('/',citasRoutes)
app.use('/', extraRoutes)
app.use('/', veterinarioRoutes)
app.use('/', authController);  
app.use('/', userController);
app.use('/', ventasRoutes);
app.use('/', blogsRoutes)
app.use('/',disponibilidadRoutes)

// Puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

