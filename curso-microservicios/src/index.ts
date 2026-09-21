// Archivo principal que levanta el servidor 
import express from 'express';
import productRoutes from './routes/product.routes';
import { sequelize } from './config/database';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/products', productRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('✅ Base de datos SQLite sincronizada y levantada correctamente.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Microservicio de Inventario corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
};

startServer();