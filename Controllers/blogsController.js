class BlogControlller {
    constructor(blogsService) {
      this.blogsService = blogsService;
    }
  
    async obtenerBlogs(req, res) {
      try {
        const {page = 1, limit} = req.query
        const pageNumber= parseInt(page);
        const pageSize = parseInt(limit) || 10;
        const blogs = await this.blogsService.obtenerBlogs(pageNumber,pageSize);
        res.json(blogs);
      } catch (error) {
        console.error('Error en obtenerBlogs:', error); 
        res.status(500).json({ message: 'Error al obtener los blogs', error: error.message });
      }
    }
  
    async obtenerBlogPorId(req, res) {
      try {
        const id = req.params.id;
        const blog = await this.blogsService.obtenerBlogPorId(id);
        if (blog) {
          res.json(blog);
        } else {
          res.status(404).json({ message: 'Blog no encontrado' });
        }
      } catch (error) {
        console.error('Error en obtenerBlogPorId:', error); 
        res.status(500).json({ message: 'Error al obtener el blog', error: error.message });
      }
    }
  
    async crearBlog(req, res) {
      try {
        if(!req.file){
          return res.status(400).json({ message: 'La imagen es obligatoria' });
        }
        
        const imagenUrl = req.file.path;
        const nuevoBlog = {
          ...req.body,
          imagen: imagenUrl,
        }
    
        const blog = await this.blogsService.crearBlog(nuevoBlog);
        res.status(201).json(blog);
      } catch (error) {
        console.error('Error en crearBlog:', error); 
        res.status(500).json({ message: 'Error al crear el blog', error: error.message });
      }
    }
  
    async actualizarBlog(req, res) {
      try {
        const id = req.params.id;
        const datosActualizados = req.body;
        if (req.file) {
          datosActualizados.imagen = req.file.path; 
        }
        const blog = await this.blogsService.actualizarBlog(id, datosActualizados);
        if (blog) {
          res.json(blog);
        } else {
          res.status(404).json({ message: 'Blog no encontrado' });
        }
      } catch (error) {
        console.error('Error en actualizarBlog:', error); 
        res.status(500).json({ message: 'Error al actualizar el blog', error: error.message });
      }
    }
  
    async eliminarBlog(req, res) {
      try {
        const id = req.params.id;
        const eliminado = await this.blogsService.eliminarBlog(id);
        if (eliminado) {
          res.json({ message: 'Blog eliminado' });
        } else {
          res.status(404).json({ message: 'Bloog no encontrado' });
        }
      } catch (error) {
        console.error('Error en eliminarBlog:', error); 
        res.status(500).json({ message: 'Error al eliminar el Blog', error: error.message });
      }
    }
  }
  
  module.exports = BlogControlller;
  