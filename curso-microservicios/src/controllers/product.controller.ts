import { Request, Response } from 'express';
import { Product } from '../models/Product';

// POST: Crear producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

// GET: Obtener todos los productos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el inventario', error });
  }
};

// GET: Obtener un solo producto por su ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string); // Solución TypeScript
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

// PUT: Actualizar un producto existente
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string); // Solución TypeScript
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await product.update(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

// DELETE: Eliminar un producto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string); // Solución TypeScript
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await product.destroy();
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};