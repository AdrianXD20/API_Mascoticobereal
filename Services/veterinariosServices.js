const { where } = require('sequelize');
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
        const veterinario = await Veterinario.findByPk(Id);
            if(veterinario){
                const updateRows = await Veterinario.update(datosActualizados,{where:{id:Id}})
                    if(updateRows > 0){
                        return Veterinario.findByPk(Id)
                    }
            }
                return null;
    }

    async eliminarVeterinario(Id){
        const veterinario = await Veterinario.findByPk(Id);
            if(veterinario){
                return Veterinario.destroy({where:{id:Id}});
            }
                return null;
    }

}


module.exports= VeterinarioService;