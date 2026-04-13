// src/types/index.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  stock: number;
  createdAt: string;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  user: User;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  address: string;
  city: string;
  contactInfo: string;
  createdAt: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: Order[];
  salesByMonth: { month: string; total: number }[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
