'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemProduto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItemProduto.belongsTo(models.Compra, {foreignKey: 'CompraId', as: 'compra'});
      ItemProduto.belongsTo(models.Produto, {foreignKey:'ProdutoId', as: 'produto'});
    }
  }
  ItemProduto.init({
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemProduto',
  });
  return ItemProduto;
};