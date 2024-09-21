const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Region = require('./Region');
const Category = require('./Category');

const Store = sequelize.define(
  'Store',
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatsapp_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tiktok_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Region,
        key: 'id',
      },
    },
    archive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

Store.associate = (models) => {
  Store.belongsTo(models.Category, { foreignKey: 'categoryId' });
  Store.belongsTo(models.Region, { foreignKey: 'regionId' });
};

module.exports = Store;
