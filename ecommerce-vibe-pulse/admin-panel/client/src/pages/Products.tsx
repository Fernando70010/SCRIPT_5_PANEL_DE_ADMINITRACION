// src/pages/Products.tsx
import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import type { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Camiseta Urban Classic', price: 65000, category: 'Camisetas', stock: 30, image: '', createdAt: new Date().toISOString() },
  { id: 2, name: 'Jean Slim Fit', price: 120000, category: 'Pantalones', stock: 15, image: '', createdAt: new Date().toISOString() },
  { id: 3, name: 'Hoodie VibePulse', price: 95000, category: 'Buzos', stock: 8, image: '', createdAt: new Date().toISOString() },
  { id: 4, name: 'Chaqueta Street', price: 180000, category: 'Chaquetas', stock: 5, image: '', createdAt: new Date().toISOString() },
  { id: 5, name: 'Shorts Sport', price: 55000, category: 'Shorts', stock: 22, image: '', createdAt: new Date().toISOString() },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts(MOCK_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category ?? '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ color: '#666' }}>Cargando productos...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, color: '#1a1a2e', fontSize: '26px' }}>👕 Productos</h1>
        <input
          type="text"
          placeholder="Buscar producto o categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd',
            fontSize: '14px', width: '260px', outline: 'none',
          }}
        />
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#1a1a2e', color: '#fff' }}>
              {['#ID', 'Nombre', 'Categoría', 'Precio', 'Stock', 'Disponibilidad'].map((h) => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#888' }}>No se encontraron productos</td></tr>
            ) : filtered.map((product, idx) => (
              <tr key={product.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '14px 16px', fontWeight: '700', color: '#e94560' }}>#{product.id}</td>
                <td style={{ padding: '14px 16px', fontWeight: '600' }}>{product.name}</td>
                <td style={{ padding: '14px 16px', color: '#555' }}>
                  <span style={{ background: '#f0f4ff', color: '#3b82f6', padding: '3px 10px', borderRadius: '20px', fontSize: '12px' }}>
                    {product.category ?? 'Sin categoría'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: '700' }}>${product.price.toLocaleString('es-CO')}</td>
                <td style={{ padding: '14px 16px' }}>{product.stock} uds.</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                    background: product.stock > 10 ? '#d1fae5' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                    color: product.stock > 10 ? '#10b981' : product.stock > 0 ? '#f59e0b' : '#ef4444',
                  }}>
                    {product.stock > 10 ? 'Disponible' : product.stock > 0 ? 'Stock bajo' : 'Agotado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
