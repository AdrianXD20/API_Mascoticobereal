const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion'); // Asegúrate de tener configurada la conexión

const CaracteristicaExtra = sequelize.define('CaracteristicaExtra', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  tamañoMascota: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Peso: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Largo: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Talla: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'caracteristicas_extras', 
  timestamps: false,
});

module.exports = CaracteristicaExtra;
