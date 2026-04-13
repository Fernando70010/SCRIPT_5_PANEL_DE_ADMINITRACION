// src/layouts/AdminLayout.tsx
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/admin/dashboard', label: '📊 Dashboard' },
  { to: '/admin/orders',    label: '📦 Pedidos' },
  { to: '/admin/products',  label: '👕 Productos' },
  { to: '/admin/users',     label: '👥 Usuarios' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: '240px', background: '#1a1a2e', color: '#fff',
        display: 'flex', flexDirection: 'column', padding: '24px 0',
        position: 'fixed', top: 0, left: 0, height: '100vh',
      }}>
        <div style={{ padding: '0 24px 32px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#e94560' }}>⚡ VibePulse</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#aaa' }}>Panel Admin</p>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to} to={to}
              style={({ isActive }) => ({
                display: 'block', padding: '12px 24px', color: isActive ? '#e94560' : '#ccc',
                textDecoration: 'none', fontSize: '14px', fontWeight: isActive ? '600' : '400',
                background: isActive ? 'rgba(233,69,96,0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid #e94560' : '3px solid transparent',
                transition: 'all 0.2s',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            margin: '0 16px', padding: '10px', background: 'rgba(233,69,96,0.2)',
            color: '#e94560', border: '1px solid #e94560', borderRadius: '8px',
            cursor: 'pointer', fontSize: '14px',
          }}
        >
          🚪 Cerrar sesión
        </button>
      </aside>

      {/* ── Contenido principal ── */}
      <main style={{
        marginLeft: '240px', flex: 1, background: '#f5f5f5',
        minHeight: '100vh', padding: '32px',
      }}>
        <Outlet />
      </main>
    </div>
  );
}
