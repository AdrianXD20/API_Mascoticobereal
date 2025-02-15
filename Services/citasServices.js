const Cita = require('../Models/citaModel');
const DisponibilidadVeterinario = require('../Models/disponibilidad_veterinarioModel');
const nodemailer = require('nodemailer');
const env = require('dotenv').config();


// Configuración de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.email, pass: process.env.email_password }
});

// Verificar si la hora de la cita está dentro del horario disponible
const verificarDisponibilidad = async (id_veterinario, fecha_cita, hora_cita) => {
    const disponibilidad = await DisponibilidadVeterinario.findOne({ 
        where: { id_veterinario, fecha: fecha_cita } 
    });

    if (!disponibilidad) return false;

    return hora_cita >= disponibilidad.hora_inicio && hora_cita <= disponibilidad.hora_fin;
};

// Agendar una nueva cita
const agendarCita = async (data) => {
    const { id_veterinario, fecha_cita, hora_cita } = data;

    // Verificar disponibilidad
    const disponible = await verificarDisponibilidad(id_veterinario, fecha_cita, hora_cita);
    if (!disponible) throw new Error('Horario no disponible');

    const cita = await Cita.create(data);

    // Enviar correo de confirmación al veterinario
    await transporter.sendMail({
        from: 'tuemail@gmail.com',
        to: 'correo_veterinario@gmail.com',
        subject: 'Nueva solicitud de cita',
        text: `Tienes una nueva solicitud de cita para el ${fecha_cita} a las ${hora_cita}.`
    });

    return cita;
};

// Confirmar o rechazar cita
const actualizarEstadoCita = async (id, estado) => {
    const cita = await Cita.findByPk(id);
    if (!cita) throw new Error('Cita no encontrada');

    cita.estado = estado;
    await cita.save();

    // Notificar al cliente
    await transporter.sendMail({
        from: 'tuemail@gmail.com',
        to: 'correo_cliente@gmail.com',
        subject: `Estado de tu cita (${estado})`,
        text: `Tu cita para el ${cita.fecha_cita} ha sido ${estado}.`
    });

    return cita;
};

// Obtener citas de un veterinario
const obtenerCitasPorVeterinario = async (id_veterinario) => {
    return await Cita.findAll({ where: { id_veterinario } });
};

module.exports = { agendarCita, actualizarEstadoCita, obtenerCitasPorVeterinario };
