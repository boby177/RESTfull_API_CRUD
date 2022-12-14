const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./productModel.js")(sequelize, DataTypes);
db.reviews = require("./reviewModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-sync has completed successfully");
});

// 1 to Many relation

db.products.hasMany(db.reviews, {
  foreignKey: "product_id",
  as: "reviews",
});

db.reviews.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "product",
});


module.exports = db;