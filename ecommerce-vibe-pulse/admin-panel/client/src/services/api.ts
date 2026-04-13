// src/services/api.ts
import axios from 'axios';
import type { DashboardStats, Order, OrderStatus, Product, User } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Adjuntar token JWT en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Redirigir al login si el token expira
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Dashboard ──────────────────────────────────────────────
export const getDashboardStats = (): Promise<DashboardStats> =>
  api.get('/admin/dashboard').then((r) => r.data);

// ── Pedidos ────────────────────────────────────────────────
export const getOrders = (): Promise<Order[]> =>
  api.get('/admin/orders').then((r) => r.data);

export const updateOrderStatus = (id: number, status: OrderStatus): Promise<Order> =>
  api.patch(`/admin/orders/${id}/status`, { status }).then((r) => r.data);

// ── Productos ──────────────────────────────────────────────
export const getProducts = (): Promise<Product[]> =>
  api.get('/admin/products').then((r) => r.data);

// ── Usuarios ───────────────────────────────────────────────
export const getUsers = (): Promise<User[]> =>
  api.get('/admin/users').then((r) => r.data);
