const {DataTypes} = require('sequelize');
module.exports = {
  schema: {
    idAuthor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullName: {
      type: DataTypes.STRING
    }
  },
  modelName: 'Author'
}
