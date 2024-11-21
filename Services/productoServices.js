const Productos = require('../Models/productosModel')

class ProductoService {
  
  
    async obtenerProductos(page, limit) {
      const offset = (page - 1) * limit;
      return Productos.findAll({limit,offset});
    }
  
    async obtenerProductoPorId(Id) {
      return Productos.findByPk(Id);
    }
  
    async crearProducto(nuevoProducto) {
      return Productos.create(nuevoProducto);
    }
  
    async actualizarProducto(Id, datosActualizados) {
      const productos = await Productos.findByPk(Id);
      if (productos) {
        const updateRows = await Productos.update(datosActualizados,{
          where:{id:Id}
        })  
            if (updateRows > 0){
              return Productos.findByPk(Id);
            }
      }
        return null
    }
  
    async eliminarProducto(Id) {
      const productos = await Productos.findByPk(Id);
      if (productos) {
        return Productos.destroy({
          where:{id:Id}
        });
      }
        return null
    }
  }
  
  module.exports = ProductoService;
  