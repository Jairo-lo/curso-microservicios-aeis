import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity indica que esta clase representa una tabla de la base de datos
@Entity('products')
export class Product {
  // @PrimaryGeneratedColumn crea una columna id autoincremental
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  nombre!: string;

  // REAL es el tipo de SQLite para números decimales (precios como 19.99)
  @Column({ type: 'real' })
  precio!: number;

  @Column({ type: 'integer', default: 0 })
  stock!: number;

  @Column({ length: 80 })
  categoria!: string;
}