const Cita = require('../Models/citaModel');

class CitasServices {
  async obtenerCitas(page, limit) {
    const offset = (page - 1) * limit;
    return Cita.findAll({ limit, offset });
  }

  async obtenerCitasPorId(Id) {
    return Cita.findByPk(Id);
  }

  async crearCitas(nuevaCita) {
    return Cita.create(nuevaCita);
  }

  async actualizarCitas(Id, datosActualizados) {
    const cita = await Cita.findByPk(Id);
    if (cita) {
      const updatedRows= await Cita.update(datosActualizados, {
        where: { id: Id },
      });
      if (updatedRows > 0) {
        return await Cita.findByPk(Id); 
      }
    }
    return null; 
  }

  async eliminarCitas(Id) {
    const cita = await Cita.findByPk(Id);
    if (cita) {
      return Cita.destroy({
        where: { id: Id },
      });
    }
    return null;
  }
}

module.exports = CitasServices;
