const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idBook: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  modelName: 'Book'
}
