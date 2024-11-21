const Extra= require('../Models/caracteristicasExtraModel')

class extraService{
    
    

    async obtenerExtra(page, limit){
        const offset = (page-1) * limit;
       return Extra.findAll({limit,offset});
    }

    async obtenerExtraPorId(Id){
        return Extra.findByPk(Id);
    }

    async crearExtra(nuevoExtra){
        return Extra.create(nuevoExtra);
    }

    async actualizarExtra(Id, datosActualizados){
        const extra= await Extra.findByPk(Id);
        if(extra){
            return Extra.update(datosActualizados)
        }
        return null
    }

    async eliminarExtra(Id){
        const extra= await Extra.findByPk(Id);
        if(extra){
            return Extra.destroy();
        }
            return null
    }
}

module.exports = extraService