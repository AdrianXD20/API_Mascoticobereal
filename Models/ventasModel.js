const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion'); 
const Productos = require('./productosModel');
const Cliente = require('./UserModel')

const Ventas = sequelize.define('Ventas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Productos', 
      key: 'id',
    },
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Clientes', 
      key: 'id',
    },
  },
  tipo_mascota: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: 'ventas', 
  timestamps: false, 
});

Ventas.belongsTo(Productos,{
    foreignkey: 'id_producto',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Ventas.belongsTo(Cliente,{
    foreignkey: 'id_cliente',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = Ventas;
