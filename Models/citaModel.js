const { DataTypes } = require('sequelize');
const sequelize = require('../database/conexion');
const Mascota = require('./mascotaModel'); // Asegúrate de tener este modelo definido
const Veterinario = require('./veterinarioModel'); // Asegúrate de tener este modelo definido
const Usuario = require('./UserModel'); // Asegúrate de tener este modelo definido

const Cita = sequelize.define('Cita', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_mascota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Mascota, 
      key: 'id',
    },
  },
  id_veterinario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Veterinario,
      key: 'id',
    },
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  nombre_mascota: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'citas', 
  timestamps: false,
});

Cita.belongsTo(Mascota, { foreignKey: 'id_mascota' });

Cita.belongsTo(Veterinario, { foreignKey: 'id_veterinario' });

Cita.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Cita;
