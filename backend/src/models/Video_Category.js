module.exports = (sequelize, DataTypes) => {
  const Video_Category = sequelize.define('Video_Category', {
    id_video: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Video',
        key: 'id_video',
      },
    },
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Category',
        key: 'id_category',
      },
    },
  }, {
    tableName: 'Video_Category',
    timestamps: false,
  });

  return Video_Category;
};
