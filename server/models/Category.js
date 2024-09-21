const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

Category.associate = (models) => {
  Category.hasMany(models.Store, { foreignKey: 'categoryId' });
};

module.exports = Category;
