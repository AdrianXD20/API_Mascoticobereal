const Blogs = require('../Models/blogdModel')

class BlogsService{

    async obtenerBlogs(page, limit) {
        const offset = (page - 1) * limit;
        return Blogs.findAll({limit,offset});
      }
    
      async obtenerBlogPorId(Id) {
        return Blogs.findByPk(Id);
      }
    
      async crearBlog(nuevoBlog) {
        return Blogs.create(nuevoBlog);
      }
    
      async actualizarBlog(Id, datosActualizados,imagen=null) {
        const blogs = await Blogs.findByPk(Id);
        if (blogs) {
          if(imagen){
            datosActualizados.imagen = imagen
          }
          const updateRows = await Blogs.update(datosActualizados,{
            where:{id:Id}
          })  
              if (updateRows > 0){
                return Blogs.findByPk(Id);
              }
        }
          return null
      }
    
      async eliminarBlog(Id) {
        const blogs = await Blogs.findByPk(Id);
        if (blogs) {
          return Blogs.destroy({
            where:{id:Id}
          });
        }
          return null
      }
}

module.exports= BlogsService