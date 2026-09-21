import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Product } from '../models/Product';

// getRepository devuelve el "repositorio" de la entidad Product:
// es el objeto que nos da métodos listos (find, save, delete, etc.)
const repository = AppDataSource.getRepository(Product);

// --- Obtener todos los productos (GET /api/products) ---
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await repository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos', detalle: error });
  }
};

// --- Obtener un producto por id (GET /api/products/:id) ---
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    // findOneBy busca el primer registro que cumpla la condición { id }
    const product = await repository.findOneBy({ id });

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto', detalle: error });
  }
};

// --- Crear un producto (POST /api/products) ---
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, precio, stock, categoria } = req.body;

    // Creamos el objeto; los campos nos llegan en el cuerpo JSON de la petición
    const product = repository.create({ nombre, precio, stock, categoria });
    const saved = await repository.save(product);

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto', detalle: error });
  }
};

// --- Actualizar un producto (PUT /api/products/:id) ---
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { nombre, precio, stock, categoria } = req.body;

    const product = await repository.findOneBy({ id });

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    // Actualizamos solo los campos que vengan definidos en la petición
    product.nombre = nombre ?? product.nombre;
    product.precio = precio ?? product.precio;
    product.stock = stock ?? product.stock;
    product.categoria = categoria ?? product.categoria;

    const updated = await repository.save(product);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto', detalle: error });
  }
};

// --- Eliminar un producto (DELETE /api/products/:id) ---
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    // delete comprueba por sí mismo cuántos registros borró
    const result = await repository.delete({ id });

    if (result.affected === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto', detalle: error });
  }
};