import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Product extends Model {
  // Usamos 'declare' para evitar que TS sobrescriba los valores de Sequelize
  declare id: number;
  declare name: string;
  declare price: number;
  declare stock: number;
  declare category: string;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'products'
});