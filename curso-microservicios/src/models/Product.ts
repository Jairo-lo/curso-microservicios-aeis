// Entidad de Producto para el supermercado 
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
  public category!: string;
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