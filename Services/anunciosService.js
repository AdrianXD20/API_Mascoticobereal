const anuncios = require('../Models/anucioModel')

class anunciosService{

    async obtenerAnuncios(){
        return anuncios.findAll()
    }

    async obtenerAnunciosId(Id){
        return anuncios.findByPk(Id)
    }

    async crearAnuncios(n){

    }

    async actualizarAnuncios(Id,datosActualizado){

    }

    async eliminarAnuncios(Id){
        const adds = await anuncios.findByFk(Id)
        if(adds){
            return anuncios.destroy(Id)
        }
    }
}