const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol:{
    type: DataTypes.STRING(10),
    defaultValue: 'usuario'

  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true
  }  
}, {
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = User;
