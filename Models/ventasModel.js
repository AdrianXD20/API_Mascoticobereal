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
  id_productos: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Productos', 
      key: 'id',
    },
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Clientes', 
      key: 'id',
    },
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'ventas', 
  timestamps: false, 
});

Ventas.belongsTo(Productos,{
    foreignKey: 'id_producto',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Ventas.belongsTo(Cliente,{
    foreignKey: 'id_cliente',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = Ventas;
