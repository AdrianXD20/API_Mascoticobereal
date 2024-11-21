const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion'); 
const caracteristicasExtras = require('./caracteristicasExtraModel');
const CaracteristicaExtra = require('./caracteristicasExtraModel');

const Productos = sequelize.define('Productos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  mascota: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  edad: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idCaracteristicasExtras: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'CaracteristicasExtras', 
      key: 'id',
    },
  },
}, {
  tableName: 'productos', 
  timestamps: false, 
});

Productos.belongsTo(CaracteristicaExtra,{
    foreignKey: 'idCaracteristicasExtras',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = Productos;

