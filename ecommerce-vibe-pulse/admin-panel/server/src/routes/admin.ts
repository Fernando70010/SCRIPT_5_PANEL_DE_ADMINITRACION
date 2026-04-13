import { Router } from 'express';
import { 
  getDashboardStats, getOrders, updateOrderStatus, 
  getProducts, getUsers 
} from '../controllers/adminController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// 📊 DASHBOARD
router.get('/dashboard', authenticateAdmin, getDashboardStats);

// 📦 ORDERS
router.get('/orders', authenticateAdmin, getOrders);
router.patch('/orders/:id/status', authenticateAdmin, updateOrderStatus);

// 👕 PRODUCTS  
router.get('/products', authenticateAdmin, getProducts);

// 👥 USERS
router.get('/users', authenticateAdmin, getUsers);

export default router;

