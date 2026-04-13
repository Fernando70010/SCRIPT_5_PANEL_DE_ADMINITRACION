// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import Products from '../pages/Products';
import Users from '../pages/Users';

// Guard: redirige al login si no hay token
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

// Página de login temporal (Sprint 1 la implementa completamente)
function LoginPage() {
  const handleLogin = () => {
    // Simula token admin para pruebas
    localStorage.setItem('token', 'admin-mock-token');
    window.location.href = '/admin/dashboard';
  };
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#1a1a2e', flexDirection: 'column', gap: '16px',
    }}>
      <h1 style={{ color: '#e94560', fontSize: '32px', margin: 0 }}>⚡ VibePulse Admin</h1>
      <p style={{ color: '#aaa', margin: 0 }}>Panel de administración</p>
      <button
        onClick={handleLogin}
        style={{
          marginTop: '16px', padding: '12px 32px', background: '#e94560',
          color: '#fff', border: 'none', borderRadius: '8px',
          fontSize: '16px', cursor: 'pointer', fontWeight: '600',
        }}
      >
        Ingresar como Admin (demo)
      </button>
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders"    element={<Orders />} />
          <Route path="products"  element={<Products />} />
          <Route path="users"     element={<Users />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
