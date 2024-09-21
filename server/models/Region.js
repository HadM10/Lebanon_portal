const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Region = sequelize.define(
  'Region',
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
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Region.associate = (models) => {
  Region.hasMany(models.Store, { foreignKey: 'regionId' });
};

module.exports = Region;
