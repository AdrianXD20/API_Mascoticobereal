const citaService = require('../Services/citasServices');

exports.agendarCita = async (req, res) => {
    try {
        const cita = await citaService.agendarCita(req.body);
        res.status(201).json({ message: 'Cita registrada', cita });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.actualizarEstadoCita = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const cita = await citaService.actualizarEstadoCita(id, estado);
        res.json({ message: `Cita ${estado}`, cita });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.obtenerCitasPorVeterinario = async (req, res) => {
    try {
        const citas = await citaService.obtenerCitasPorVeterinario(req.params.id_veterinario);
        res.json(citas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.ObtenerCitasByUserId = async (req,res) => {
    try{
        const citas = await citaService.ObtenerCitasByUserId(req.params.cliente);
        res.json(citas)
    }catch(error){
        res.status(401).json({error: error.message})
    }
};
