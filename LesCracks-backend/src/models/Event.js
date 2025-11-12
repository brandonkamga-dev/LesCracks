'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id_event: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: true, len: [3, 255] }
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: { notEmpty: true, len: [10, 1000] }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { isDate: true }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { notEmpty: true, len: [3, 255] }
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Category', key: 'id_category' }
    },
    id_image: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Image', key: 'id_image' }
    },
    click_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'Event',
    indexes: [{ fields: ['title', 'description'], type: 'FULLTEXT' },
    { fields: ['click_count'] }
  ],
    timestamps: false
  });

  Event.associate = function(models) {
    Event.belongsTo(models.Category, { foreignKey: 'id_category', as: 'category' });
    Event.belongsTo(models.Image, { foreignKey: 'id_image', as: 'image' });
    Event.belongsToMany(models.Admin, {
      through: models.Admin_Event,
      foreignKey: 'id_event',
      otherKey: 'id_admin',
      as: 'admins'
    });
    Event.belongsToMany(models.Tag, {
      through: models.Event_Tag,
      foreignKey: 'id_event',
      otherKey: 'id_tag',
      as: 'tags'
    });
  };

  return Event;
};