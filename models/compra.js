'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Compra.belongsTo(models.Cliente, {foreignKey: 'ClienteId', as: 'clientes'});
      Compra.belongsToMany(models.Servico,{ 
        foreignKey: 'ProdutoId', 
        through: 'ItemProduto', as: 'produto_ped'
      });
      Compra.hasMany(models.ItemProduto, {foreignKey: 'CompraId', as: 'item_produto'})
    
    }
  }
  Compra.init({
    data: DataTypes.DATEONLY
    
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};