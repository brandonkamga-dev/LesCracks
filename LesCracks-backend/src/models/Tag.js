'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id_tag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: { notEmpty: true, len: [2, 50] }
    }
  }, {
    tableName: 'Tag',
    timestamps: false,
    indexes: [{ fields: ['name'] }]
  });

  Tag.associate = function(models) {
    Tag.belongsToMany(models.Event, {
      through: models.Event_Tag,
      foreignKey: 'id_tag',
      otherKey: 'id_event',
      as: 'events'
    });
  };

  return Tag;
};