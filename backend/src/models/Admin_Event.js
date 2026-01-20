'use strict';

module.exports = (sequelize, DataTypes) => {
  const Admin_Event = sequelize.define('Admin_Event', {
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Admin', key: 'id_admin' }
    },
    id_event: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Event', key: 'id_event' }
    }
  }, {
    tableName: 'Admin_Event',
    timestamps: false,
    indexes: [{ fields: ['id_admin', 'id_event'] }]
  });

  Admin_Event.associate = function(models) {
    Admin_Event.belongsTo(models.Admin, { foreignKey: 'id_admin', as: 'admin' });
    Admin_Event.belongsTo(models.Event, { foreignKey: 'id_event', as: 'event' });
  };

  return Admin_Event;
};