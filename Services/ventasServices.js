const { off } = require('process');
const ventas = require('../Models/ventasModel')

class ventaService{
    

    async obtenerVentas(page,limit){
        const offset = (page -1) * limit
        return ventas.findAll({limit,offset});
    }

    async obtenerVentaPorId(Id){
        return ventas.findByPk(Id);
    }

    async crearVenta(nuevoExtra){
        return ventas.create(nuevoExtra);
    }

    async actualizarVenta(Id, datosActualizados){
        const venta= await ventas.findByPk(Id);
        if (venta) {
            return ventas.update(datosActualizados)
        }
            return null
    }

    async eliminarVenta(Id){
        const venta= await ventas.findByPk(Id);
        if (venta) {
            return ventas.destroy()
        }
            return null
    }
}

module.exports = ventaService