const Veterinario = require('../Models/veterinarioModel');

class VeterinarioService{
   
    async obtenerVeterinarios(page,limit){
        const offset = (page-1) * limit;
        return Veterinario.findAll({limit, offset});
    }

    async obtenerVeterinarioPorId(Id){
        return Veterinario.findByPk(Id);
    }

    async crearVeterinario(nuevoVeterinario){
        return Veterinario.create(nuevoVeterinario)
    }

     async actualizarVeterinario(Id, datosActualizados){
        const veterinario = await Mascota.findByPK(Id);
            if(veterinario){
                return Veterinario.update(datosActualizados);
            }
                return null;
    }

    async eliminarVeterinario(Id){
        const veterinario = await Mascota.findByPK(Id);
            if(veterinario){
                return Veterinario.destroy();
            }
                return null;
    }

}


module.exports= VeterinarioService;