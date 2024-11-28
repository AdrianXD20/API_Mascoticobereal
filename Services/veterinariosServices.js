const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = process.env.secretKey;
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
        try{
            const hashedPassword = await bcrypt.hash(nuevoVeterinario.contraseña,10);
            nuevoVeterinario.contraseña = hashedPassword;

            const veterinarioCreado = await Veterinario.create(nuevoVeterinario)
            return veterinarioCreado;
        }catch(error){
            throw new Error ('Error al registrarse: '+ error.message)
        }
    }


    async loginVeterinario(email,contraseña){
        try {

            const veterinario = await Veterinario.findOne({where:{email}});

            if(!veterinario){
                throw new Error('Veterinario no encontrado')
            }

            const isPasswordValid = await bcrypt.compare(contraseña,veterinario.contraseña);
            if(!isPasswordValid){
                throw new Error ('Contraseña incorrecta')
            }

            const JWT = jwt.sign(
                {id:veterinario.id, email: veterinario.email, nombre: veterinario.nombre, dni: veterinario.dni},
                secretKey,{expiresIn: '1h'}
            );

            return {JWT,veterinario}
        } catch (error) {
            throw new Error ('Error en el proceso de login: '+error.message)
            
        }
    }

     async actualizarVeterinario(Id, datosActualizados, imagen_perfil=null){
        const veterinario = await Veterinario.findByPk(Id);
            if(veterinario){
                if(imagen_perfil){
                    datosActualizados.imagen_perfil = imagen_perfil
                }
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