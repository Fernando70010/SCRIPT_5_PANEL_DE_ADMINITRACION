// src/pages/Users.tsx
import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import type { User } from '../types';

const MOCK_USERS: User[] = [
  { id: 1, name: 'Admin VibePulse', email: 'admin@vibe.com', role: 'ADMIN', createdAt: new Date().toISOString() },
  { id: 2, name: 'Laura Gómez', email: 'laura@mail.com', role: 'CLIENT', createdAt: new Date().toISOString() },
  { id: 3, name: 'Carlos Ruiz', email: 'carlos@mail.com', role: 'CLIENT', createdAt: new Date().toISOString() },
  { id: 4, name: 'Ana Torres', email: 'ana@mail.com', role: 'CLIENT', createdAt: new Date().toISOString() },
  { id: 5, name: 'Julián Castro', email: 'julian@mail.com', role: 'CLIENT', createdAt: new Date().toISOString() },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setUsers(MOCK_USERS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ color: '#666' }}>Cargando usuarios...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, color: '#1a1a2e', fontSize: '26px' }}>👥 Usuarios</h1>
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd',
            fontSize: '14px', width: '260px', outline: 'none',
          }}
        />
      </div>

      {/* Resumen */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total usuarios', value: users.length, color: '#1a1a2e' },
          { label: 'Clientes', value: users.filter((u) => u.role === 'CLIENT').length, color: '#3b82f6' },
          { label: 'Administradores', value: users.filter((u) => u.role === 'ADMIN').length, color: '#e94560' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: '#fff', borderRadius: '10px', padding: '16px 24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderLeft: `4px solid ${color}`,
          }}>
            <div style={{ fontSize: '22px', fontWeight: '700', color }}>{value}</div>
            <div style={{ fontSize: '13px', color: '#666' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#1a1a2e', color: '#fff' }}>
              {['#ID', 'Nombre', 'Correo electrónico', 'Rol', 'Registrado'].map((h) => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#888' }}>No se encontraron usuarios</td></tr>
            ) : filtered.map((user, idx) => (
              <tr key={user.id} style={{ background: idx % 2 === 0 ? '#fff' : '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '14px 16px', fontWeight: '700', color: '#e94560' }}>#{user.id}</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: '600' }}>{user.name}</div>
                </td>
                <td style={{ padding: '14px 16px', color: '#555' }}>{user.email}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                    background: user.role === 'ADMIN' ? '#fee2e2' : '#dbeafe',
                    color: user.role === 'ADMIN' ? '#e94560' : '#3b82f6',
                  }}>
                    {user.role === 'ADMIN' ? '⚡ Admin' : '👤 Cliente'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', color: '#888', fontSize: '12px' }}>
                  {new Date(user.createdAt).toLocaleDateString('es-CO')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
