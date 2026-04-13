import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

// ── DASHBOARD STATS ────────────────────────────────────────
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const [totalUsers, totalOrders, totalProducts, totalSalesResult, recentOrders, salesByMonth] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.product.count(),
      
      // Total ventas = sum(order.total)
      prisma.$queryRaw`SELECT COALESCE(SUM(total), 0) as totalSales FROM "Order"`,
      
      // 5 pedidos recientes
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true, email: true, role: true } } },
        select: {
          id: true,
          userId: true,
          user: true,
          status: true,
          total: true,
          address: true,
          city: true,
          createdAt: true,
        },
      }),
      
      // Ventas por mes (últimos 6 meses)
      prisma.$queryRaw`
        SELECT 
          TO_CHAR(createdAt, 'Mon') as month,
          COALESCE(SUM(total), 0) as total
        FROM "Order" 
        WHERE createdAt >= CURRENT_DATE - INTERVAL '6 months'
        GROUP BY TO_CHAR(createdAt, 'Mon')
        ORDER BY createdAt DESC
        LIMIT 6
      `,
    ]);

    const totalSales = (totalSalesResult as any[])[0]?.totalsales || 0;

    res.json({
      totalSales: Number(totalSales),
      totalOrders,
      totalUsers,
      totalProducts,
      recentOrders,
      salesByMonth: (salesByMonth as any[]).map((m: any) => ({
        month: m.month,
        total: Number(m.total),
      })),
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

// ── ORDERS ─────────────────────────────────────────────────
export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Object.values(OrderStatus).includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: { status: status as OrderStatus },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: 'Order not found' });
  }
};

// ── PRODUCTS ───────────────────────────────────────────────
export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// ── USERS ──────────────────────────────────────────────────
export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

