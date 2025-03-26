const Pets = require('../Models/petsModel');


class PetsService{

    async obtenerPets(page,limit){
        const offset = (page-1) * limit;
        return Pets.findAll({limit,offset})
    }

    async obtenerPetPorId(Id){
        return Pets.findByPk(Id)
    }

    async crearPets(nuevoPet){
        return Pets.create(nuevoPet)
    }

    async actualizarPet(Id,newData){
        const Pets = await Pets.findByPk(Id);
        if(Pets){
            res.status(201).json(Pets)
        }else{
            console.log('Error gei')
        }
    }

    async eliminarPet(Id){
        const pet = await Pets.findByPk(Id)
        if(pet){
                
        }
    }
}