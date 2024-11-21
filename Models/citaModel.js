const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');

const Citas = sequelize.define(
  'Citas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_mascota: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'mascotas', // Nombre de la tabla relacionada
        key: 'id',
      },
    },
    id_veterinario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'veterinarios', // Nombre de la tabla relacionada
        key: 'id',
      },
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios', // Nombre de la tabla relacionada
        key: 'id',
      },
    },
    nombre_mascota: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATEONLY, // Para representar fechas sin hora
      allowNull: true,
    },
  },
  {
    tableName: 'citas',
    timestamps: false, // Asume que no hay columnas `createdAt` y `updatedAt`
  }
);

module.exports = Citas;
