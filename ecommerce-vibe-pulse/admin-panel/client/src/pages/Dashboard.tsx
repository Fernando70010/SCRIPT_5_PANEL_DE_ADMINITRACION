// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { getDashboardStats } from '../services/api';
import type { DashboardStats } from '../types';

// ── Datos simulados mientras se conecta el backend ──────────
const MOCK_STATS: DashboardStats = {
  totalSales: 4850000,
  totalOrders: 128,
  totalUsers: 74,
  totalProducts: 42,
  recentOrders: [
    { id: 1, user: { id: 2, name: 'Laura Gómez', email: 'laura@mail.com', role: 'CLIENT', createdAt: '' },
      userId: 2, status: 'PENDING', total: 189000, address: 'Cra 7 #45-12', city: 'Bogotá', contactInfo: '3001234567',
      items: [], createdAt: new Date().toISOString() },
    { id: 2, user: { id: 3, name: 'Carlos Ruiz', email: 'carlos@mail.com', role: 'CLIENT', createdAt: '' },
      userId: 3, status: 'SHIPPED', total: 320000, address: 'Av. El Dorado 90-10', city: 'Bogotá', contactInfo: '3109876543',
      items: [], createdAt: new Date().toISOString() },
    { id: 3, user: { id: 4, name: 'Ana Torres', email: 'ana@mail.com', role: 'CLIENT', createdAt: '' },
      userId: 4, status: 'DELIVERED', total: 95000, address: 'Cl 100 #15-40', city: 'Medellín', contactInfo: '3205551234',
      items: [], createdAt: new Date().toISOString() },
  ],
  salesByMonth: [
    { month: 'Ene', total: 520000 },
    { month: 'Feb', total: 780000 },
    { month: 'Mar', total: 430000 },
    { month: 'Abr', total: 920000 },
    { month: 'May', total: 650000 },
    { month: 'Jun', total: 1050000 },
  ],
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING:    { label: 'Pendiente',   color: '#f59e0b' },
  PROCESSING: { label: 'Procesando',  color: '#3b82f6' },
  SHIPPED:    { label: 'Enviado',     color: '#8b5cf6' },
  DELIVERED:  { label: 'Entregado',   color: '#10b981' },
  CANCELLED:  { label: 'Cancelado',   color: '#ef4444' },
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>(MOCK_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setStats(MOCK_STATS))   // usa mock si el backend no responde
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: '#666' }}>Cargando dashboard...</p>;

  const cards = [
    { label: 'Ventas totales',  value: `$${stats.totalSales.toLocaleString('es-CO')}`, icon: '💰', color: '#e94560' },
    { label: 'Pedidos',         value: stats.totalOrders,  icon: '📦', color: '#3b82f6' },
    { label: 'Clientes',        value: stats.totalUsers,   icon: '👥', color: '#10b981' },
    { label: 'Productos',       value: stats.totalProducts, icon: '👕', color: '#8b5cf6' },
  ];

  return (
    <div>
      <h1 style={{ margin: '0 0 24px', color: '#1a1a2e', fontSize: '26px' }}>Dashboard</h1>

      {/* Tarjetas indicadores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {cards.map(({ label, value, icon, color }) => (
          <div key={label} style={{
            background: '#fff', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            borderTop: `4px solid ${color}`,
          }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
            <div style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a2e' }}>{value}</div>
            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>

        {/* Gráfica de ventas */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: '16px', color: '#1a1a2e' }}>📈 Ventas por mes</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.salesByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString('es-CO')}`, 'Ventas']} />
              <Bar dataKey="total" fill="#e94560" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pedidos recientes */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: '16px', color: '#1a1a2e' }}>🕒 Pedidos recientes</h2>
          {stats.recentOrders.map((order) => {
            const st = STATUS_LABELS[order.status];
            return (
              <div key={order.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0', borderBottom: '1px solid #f0f0f0',
              }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>#{order.id} — {order.user.name}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>{order.city}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>${order.total.toLocaleString('es-CO')}</div>
                  <span style={{
                    fontSize: '11px', padding: '2px 8px', borderRadius: '20px',
                    background: `${st.color}20`, color: st.color, fontWeight: '600',
                  }}>{st.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
