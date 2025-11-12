'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event_Tag = sequelize.define('Event_Tag', {
    id_event: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Event', key: 'id_event' }
    },
    id_tag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Tag', key: 'id_tag' }
    }
  }, {
    tableName: 'Event_Tag',
    timestamps: false,
    indexes: [{ fields: ['id_event', 'id_tag'] }]
  });

  Event_Tag.associate = function(models) {
    Event_Tag.belongsTo(models.Event, { foreignKey: 'id_event', as: 'event' });
    Event_Tag.belongsTo(models.Tag, { foreignKey: 'id_tag', as: 'tag' });
  };

  return Event_Tag;
};