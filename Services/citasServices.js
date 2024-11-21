const Cita = require('../Models/citaModel')

class CitasServices {
  
  
    async obtenerCitas(page, limit) {
      const offset = (page-1) * limit;
      return Cita.findAll({limit, offset});
    }
  
    async obtenerCitasPorId(Id) {
      return Cita.findByPk(Id);
    }
  
    async crearCitas(nuevoProducto) {
      return Cita.create(nuevoProducto);
    }
  
    async actualizarCitas(Id, datosActualizados) {
      const cita= await Cita.findByPk(Id);
        if(cita){
          return Cita.update(datosActualizados);
        }
          return null
    }
  
    async eliminarCitas(Id) {
      const cita = await Cita.findByPk(Id);
      if(cita){
        return Cita.destroy();
      }
        return null;
    }
  }
  
  module.exports = CitasServices;
  