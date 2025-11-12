'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course_Tag = sequelize.define('Course_Tag', {
    id_course: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Course', key: 'id_course' }
    },
    id_tag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'Tag', key: 'id_tag' }
    }
  }, {
    tableName: 'Course_Tag',
    timestamps: false,
    indexes: [{ fields: ['id_course', 'id_tag'] }]
  });

  Course_Tag.associate = function(models) {
    Course_Tag.belongsTo(models.Course, { foreignKey: 'id_course', as: 'course' });
    Course_Tag.belongsTo(models.Tag, { foreignKey: 'id_tag', as: 'tag' });
  };

  return Course_Tag;
};