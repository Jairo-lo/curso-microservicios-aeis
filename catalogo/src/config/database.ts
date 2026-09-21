import 'reflect-metadata'; // Requerido por TypeORM para leer los decoradores
import { DataSource } from 'typeorm';
import { Product } from '../models/Product';

// DataSource es la configuración de conexión a la base de datos.
// Con TypeORM podemos cambiar de SQLite a PostgreSQL/MySQL solo cambiando estas opciones.
export const AppDataSource = new DataSource({
  type: 'sqlite', // Motor de base de datos (ligero, ideal para desarrollo)
  database: 'database.sqlite', // Nombre del archivo donde se guardan los datos
  entities: [Product], // Lista de entidades (tablas) que TypeORM debe conocer
  synchronize: true, // Crea/actualiza las tablas automáticamente según las entidades (SOLO en desarrollo)
  logging: true, // Muestra las consultas SQL ejecutadas en la consola
});