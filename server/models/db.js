const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  }
);

// Import models
const Category = require('./Category');
const Region = require('./Region');
const Store = require('.Store');
const StoreImage = require('./StoreImage');

// Initialize associations
const models = {
  Category,
  Region,
  Store,
  StoreImage,
};

// Define associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Sync models with database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database & tables updated');
  })
  .catch((err) => {
    console.error('Error updating database:', err);
  });

module.exports = {
  sequelize,
  ...models,
};
