const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');

const Veterinario = sequelize.define('Veterinario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grado_estudio: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true, 
    },
  },
  especialidad: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dni: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true, 
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'veterinarios', 
  timestamps: false, 
});

module.exports = Veterinario;
