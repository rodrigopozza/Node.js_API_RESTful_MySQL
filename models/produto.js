'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produto.belongsToMany(models.Compra,{
        through : 'ItemProduto', as: 'prod'
      });
      Produto.hasMany(models.ItemProduto,{foreignKey: 'ProdutoId', as: 'item_produto'})
    }
  }
  Produto.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};