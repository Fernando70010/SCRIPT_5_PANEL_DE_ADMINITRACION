// src/pages/Orders.tsx
import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../services/api';
import type { Order, OrderStatus } from '../types';

const STATUS_OPTIONS: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const STATUS_LABELS: Record<OrderStatus, { label: string; color: string }> = {
  PENDING:    { label: 'Pendiente',   color: '#f59e0b' },
  PROCESSING: { label: 'Procesando',  color: '#3b82f6' },
  SHIPPED:    { label: 'Enviado',     color: '#8b5cf6' },
  DELIVERED:  { label: 'Entregado',   color: '#10b981' },
  CANCELLED:  { label: 'Cancelado',   color: '#ef4444' },
};

// Datos de prueba para desarrollo
const MOCK_ORDERS: Order[] = [
  { id: 1, userId: 2, user: { id: 2, name: 'Laura Gómez', email: 'laura@mail.com', role: 'CLIENT', createdAt: '' },
    items: [], status: 'PENDING', total: 189000, address: 'Cra 7 #45-12', city: 'Bogotá',
    contactInfo: '3001234567', createdAt: new Date().toISOString() },
  { id: 2, userId: 3, user: { id: 3, name: 'Carlos Ruiz', email: 'carlos@mail.com', role: 'CLIENT', createdAt: '' },
    items: [], status: 'SHIPPED', total: 320000, address: 'Av. El Dorado 90-10', city: 'Bogotá',
    contactInfo: '3109876543', createdAt: new Date().toISOString() },
  { id: 3, userId: 4, user: { id: 4, name: 'Ana Torres', email: 'ana@mail.com', role: 'CLIENT', createdAt: '' },
    items: [], status: 'DELIVERED', total: 95000, address: 'Cl 100 #15-40', city: 'Medellín',
    contactInfo: '3205551234', createdAt: new Date().toISOString() },
  { id: 4, userId: 5, user: { id: 5, name: 'Julián Castro', email: 'julian@mail.com', role: 'CLIENT', createdAt: '' },
    items: [], status: 'PROCESSING', total: 560000, address: 'Tv 15 #80-60', city: 'Cali',
    contactInfo: '3156667788', createdAt: new Date().toISOString() },
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setOrders(MOCK_ORDERS))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    setUpdating(orderId);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch {
      // En modo mock: actualizar el estado localmente
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <p style={{ color: '#666' }}>Cargando pedidos...</p>;

  return (
    <div>
      <h1 style={{ margin: '0 0 24px', color: '#1a1a2e', fontSize: '26px' }}>📦 Pedidos</h1>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#1a1a2e', color: '#fff' }}>
              {['#ID', 'Cliente', 'Ciudad', 'Total', 'Estado', 'Fecha', 'Cambiar estado'].map((h) => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              const st = STATUS_LABELS[order.status];
              return (
                <tr key={order.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '700', color: '#e94560' }}>#{order.id}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: '600' }}>{order.user.name}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{order.user.email}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#555' }}>{order.city}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '700' }}>${order.total.toLocaleString('es-CO')}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '20px',
                      background: `${st.color}20`, color: st.color,
                      fontWeight: '600', fontSize: '12px',
                    }}>
                      {st.label}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#888', fontSize: '12px' }}>
                    {new Date(order.createdAt).toLocaleDateString('es-CO')}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <select
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      style={{
                        padding: '6px 10px', borderRadius: '6px', border: '1px solid #ddd',
                        fontSize: '13px', cursor: 'pointer', background: '#fff',
                      }}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{STATUS_LABELS[s].label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
