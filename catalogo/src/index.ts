import express from 'express';
import { AppDataSource } from './config/database';
import productRoutes from './routes/product.routes';

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para que Express pueda leer el JSON del body

// Montamos las rutas de productos bajo el prefijo /api/products
app.use('/api/products', productRoutes);

// Ruta raíz a modo de comprobación rápida en el navegador
app.get('/', (_req, res) => {
  res.send('Microservicio de Catálogo funcionando');
});

// 1) Inicializamos la conexión con la base de datos
// 2) Después de conectarnos, levantamos el servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Base de datos conectada correctamente');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar la base de datos', error);
  });