const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Store = require('./Store'); // Adjust path as needed

const StoreImage = sequelize.define(
  'StoreImage',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    store_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Store,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

StoreImage.associate = (models) => {
  StoreImage.belongsTo(models.Store, { foreignKey: 'storeId' });
};

module.exports = StoreImage;
