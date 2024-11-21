const Mascota = require('../Models/mascotaModel'); // Importar el modelo

class mascotasServices {
  
  async obtenerMascotas(page, limit) {
    const offset = (page - 1) * limit;
    return Mascota.findAll({
      limit,
      offset
    });
  }

  async obtenerMascotasPorId(Id) {
    return Mascota.findByPk(Id);
  }

  async crearMascotas(nuevoProducto) {
    return Mascota.create(nuevoProducto); 
  }

  async actualizarMascotas(Id, datosActualizados) {
    const mascota = await Mascota.findByPk(Id);
    if (mascota) {
      return mascota.update(datosActualizados);
    }
    return null; 
  }

  async eliminarMascotas(Id) {
    const mascota = await Mascota.findByPk(Id);
    if (mascota) {
      return mascota.destroy(); 
    }
    return null;
  }
}

module.exports = mascotasServices;
