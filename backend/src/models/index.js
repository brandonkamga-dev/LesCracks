'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database.js')[process.env.NODE_ENV || 'development'];

// Création de l’instance Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Importation manuelle des modèles
const Admin = require('./Admin')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Tag = require('./Tag')(sequelize, DataTypes);
const Image = require('./Image')(sequelize, DataTypes);
const Event = require('./Event')(sequelize, DataTypes);
const Admin_Event = require('./Admin_Event')(sequelize, DataTypes);
const Event_Tag = require('./Event_Tag')(sequelize, DataTypes);
const Document = require('./Document')(sequelize, DataTypes);
const VideoCourse = require('./VideoCourse')(sequelize, DataTypes);
const VideoCourseCategory = require('./VideoCourseCategory')(sequelize, DataTypes);
const VideoCourseTag = require('./VideoCourseTag')(sequelize, DataTypes);

// Rassemble tous les modèles dans un objet central
const db = {
  sequelize,
  Sequelize,
  Admin,
  Category,
  Tag,
  Image,
  Event,
  Admin_Event,
  Event_Tag,
  Document,
  VideoCourse,
  VideoCourseCategory,
  VideoCourseTag
};

// Configuration des associations (relations entre modèles)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
