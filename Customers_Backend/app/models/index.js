import fs from 'fs'
import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(__filename);

const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  logging: true,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

try {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


export default db;