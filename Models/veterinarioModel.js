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
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, 
    validate: {
      notEmpty: true,
      isEmail: true, 
    },
  },
  contraseña: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 255], 
    },
  },
  imagen_perfil:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  rol:{
    type: DataTypes.STRING(20),
    defaultValue:'admin'
  }
}, {
  tableName: 'veterinarios', 
  timestamps: false, 
});

module.exports = Veterinario;
