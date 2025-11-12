'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id_admin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true, len: [2, 100] }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: true, len: [8, 255] }
    }
  }, {
    tableName: 'Admin',
    timestamps: false,
    hooks: {
      beforeCreate: async (admin) => {
        admin.password = await bcrypt.hash(admin.password, 12);
      },
      beforeUpdate: async (admin) => {
        if (admin.changed('password')) {
          admin.password = await bcrypt.hash(admin.password, 12);
        }
      }
    }
  });

  Admin.prototype.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  Admin.associate = function(models) {
    Admin.belongsToMany(models.Course, {
      through: models.Admin_Course,
      foreignKey: 'id_admin',
      otherKey: 'id_course',
      as: 'courses'
    });
    Admin.belongsToMany(models.Event, {
      through: models.Admin_Event,
      foreignKey: 'id_admin',
      otherKey: 'id_event',
      as: 'events'
    });
  };

  return Admin;
};