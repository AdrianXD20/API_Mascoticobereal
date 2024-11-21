const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');
const User = require('./UserModel'); // Importa User después de definirlo

const Mascota = sequelize.define('Mascota', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  raza: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // Nombre del modelo de referencia
      key: 'id',         // Columna de la clave primaria de Usuarios
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'mascotas',
  timestamps: false,
});

// Relación: una Mascota pertenece a un Usuario
Mascota.belongsTo(User, {
  foreignKey: 'id_usuario', // Campo que hace la referencia en la tabla Mascotas
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = Mascota;
