import { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, type Product } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  
  // Renombramos 'newProduct' a 'formData' porque ahora servirá para crear Y para editar
  const [formData, setFormData] = useState<Product>({ name: '', price: 0, stock: 0, category: '' });
  
  // Nuevo estado para saber si estamos editando (guarda el ID) o creando (se mantiene en null)
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Esta función ahora decide si hace un POST o un PUT dependiendo del estado
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Modo Edición (PUT)
        await updateProduct(editingId, formData);
        setEditingId(null); // Salimos del modo edición
      } else {
        // Modo Creación (POST)
        await createProduct(formData);
      }
      // Limpiamos el formulario y recargamos la tabla
      setFormData({ name: '', price: 0, stock: 0, category: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  // Función que se ejecuta al presionar "Editar" en la tabla
  const handleEdit = (product: Product) => {
    setEditingId(product.id as number);
    setFormData(product); // Copia los datos de la fila seleccionada hacia el formulario
  };

  // Función para cancelar la edición y volver a modo creación
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', price: 0, stock: 0, category: '' });
  };

  const handleAddStock = async (product: Product) => {
    if (!product.id) return;
    try {
      await updateProduct(product.id, { stock: product.stock + 10 });
      fetchProducts();
    } catch (error) {
      console.error('Error al actualizar stock:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📦 Gestión de Inventario (Frontend)</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" placeholder="Nombre" required
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          type="number" placeholder="Precio" step="0.01" required
          value={formData.price || ''} onChange={e => setFormData({...formData, price: Number.parseFloat(e.target.value)})} 
        />
        <input 
          type="number" placeholder="Stock" required
          value={formData.stock || ''} onChange={e => setFormData({...formData, stock: Number.parseInt(e.target.value, 10)})} 
        />
        <input 
          type="text" placeholder="Categoría" required
          value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} 
        />
        
        {/* El botón cambia de color y texto dinámicamente */}
        <button type="submit" style={{ padding: '5px 15px', cursor: 'pointer', backgroundColor: editingId ? '#4CAF50' : '', color: editingId ? 'white' : '' }}>
          {editingId ? 'Guardar Cambios' : 'Agregar'}
        </button>
        
        {/* El botón de cancelar solo aparece si estamos editando algo */}
        {editingId && (
          <button type="button" onClick={handleCancel} style={{ padding: '5px 15px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white' }}>
            Cancelar
          </button>
        )}
      </form>

      <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>
                {p.stock} 
                <button type="button" onClick={() => handleAddStock(p)} style={{ marginLeft: '10px', cursor: 'pointer' }}>+10</button>
              </td>
              <td>{p.category}</td>
              <td>
                <button type="button" onClick={() => handleEdit(p)} style={{ color: 'blue', cursor: 'pointer', marginRight: '10px' }}>Editar</button>
                <button type="button" onClick={() => p.id && handleDelete(p.id)} style={{ color: 'red', cursor: 'pointer' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;