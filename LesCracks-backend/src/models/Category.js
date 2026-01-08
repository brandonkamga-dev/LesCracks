'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, len: [2, 100] }
    }
  }, {
    tableName: 'Category',
    timestamps: false,
    indexes: [{ fields: ['name'] }]
  });

  Category.associate = function(models) {
    Category.hasMany(models.Event, { foreignKey: 'id_category', as: 'events' });
  };

  return Category;
};