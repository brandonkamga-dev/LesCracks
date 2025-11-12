'use strict';

module.exports = (sequelize, DataTypes) => {
  const Admin_Course = sequelize.define('Admin_Course', {
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Admin', key: 'id_admin' }
    },
    id_course: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Course', key: 'id_course' }
    }
  }, {
    tableName: 'Admin_Course',
    timestamps: false,
    indexes: [{ fields: ['id_admin', 'id_course'] }]
  });

  Admin_Course.associate = function(models) {
    Admin_Course.belongsTo(models.Admin, { foreignKey: 'id_admin', as: 'admin' });
    Admin_Course.belongsTo(models.Course, { foreignKey: 'id_course', as: 'course' });
  };

  return Admin_Course;
};
