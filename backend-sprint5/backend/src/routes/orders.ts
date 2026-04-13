// server/src/routes/orders.ts
import { Router, Request, Response } from 'express';

const router = Router();

type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// Datos simulados de pedidos
let orders = [
  {
    id: 1,
    client: { id: 2, name: 'Laura Gómez', email: 'laura@mail.com' },
    status: 'PENDING' as OrderStatus,
    total: 189000,
    address: 'Cra 7 #45-12',
    city: 'Bogotá',
    contactInfo: '3001234567',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    client: { id: 3, name: 'Carlos Ruiz', email: 'carlos@mail.com' },
    status: 'SHIPPED' as OrderStatus,
    total: 320000,
    address: 'Av. El Dorado 90-10',
    city: 'Bogotá',
    contactInfo: '3109876543',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    client: { id: 4, name: 'Ana Torres', email: 'ana@mail.com' },
    status: 'DELIVERED' as OrderStatus,
    total: 95000,
    address: 'Cl 100 #15-40',
    city: 'Medellín',
    contactInfo: '3205551234',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    client: { id: 5, name: 'Julián Castro', email: 'julian@mail.com' },
    status: 'PROCESSING' as OrderStatus,
    total: 560000,
    address: 'Tv 15 #80-60',
    city: 'Cali',
    contactInfo: '3156667788',
    createdAt: new Date().toISOString(),
  },
];

// ── GET /orders ───────────────────────────────────────────
// Retorna lista de pedidos con id, cliente, estado y total (criterio 14)
router.get('/', (req: Request, res: Response) => {
  res.json(orders);
});

// ── PATCH /orders/:id/status ──────────────────────────────
// Cambia el estado de un pedido (criterio 15 y 16)
router.patch('/:id/status', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { status } = req.body as { status: OrderStatus };

  const validStatuses: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  if (!validStatuses.includes(status)) {
    res.status(400).json({ message: 'Estado no válido' });
    return;
  }

  const orderIndex = orders.findIndex((o) => o.id === id);

  if (orderIndex === -1) {
    res.status(404).json({ message: 'Pedido no encontrado' });
    return;
  }

  // Actualiza el estado del pedido
  orders[orderIndex].status = status;

  res.json(orders[orderIndex]);
});

// ── GET /orders/metrics ───────────────────────────────────
// Retorna métricas para el dashboard
router.get('/metrics/summary', (req: Request, res: Response) => {
  const totalOrders = orders.length;

  const totalSales = orders
    .filter((o) => o.status !== 'CANCELLED')
    .reduce((sum, o) => sum + o.total, 0);

  const totalUsers = 5; // En producción se obtiene de la BD

  const salesByMonth = [
    { month: 'Ene', total: 520000 },
    { month: 'Feb', total: 780000 },
    { month: 'Mar', total: 430000 },
    { month: 'Abr', total: 920000 },
    { month: 'May', total: 650000 },
    { month: 'Jun', total: 1050000 },
  ];

  res.json({
    totalSales,
    totalOrders,
    totalUsers,
    totalProducts: 5,
    recentOrders: orders.slice(0, 3),
    salesByMonth,
  });
});

export default router;
