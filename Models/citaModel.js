const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');
const Mascota = require('./mascotaModel'); // Asegúrate de tener este modelo definido
const Veterinario = require('./veterinarioModel'); // Asegúrate de tener este modelo definido
const Usuario = require('./UserModel'); // Asegúrate de tener este modelo definido

const Cita = sequelize.define('citas', {
  id: {
     type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true 
  },
  nombre_cliente: { 
    type: DataTypes.STRING(120), 
    allowNull: false },
  id_veterinario: { 
    type: DataTypes.INTEGER, 
    allowNull: false },
  fecha_cita: {
     type: DataTypes.DATEONLY, 
     allowNull: false },
  hora_cita: { 
    type: DataTypes.TIME,
     allowNull: false },
  razon: { 
    type: DataTypes.TEXT, 
    allowNull: false },
  mascota: { 
    type: DataTypes.INTEGER, 
    allowNull: false },
  estado: {
     type: DataTypes.ENUM('pendiente', 'confirmada', 'rechazada'), defaultValue: 'pendiente' 
    },
  },{
      tableName: 'citas',
        timestamps: false
      
});

module.exports = Cita;