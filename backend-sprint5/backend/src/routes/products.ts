// server/src/routes/products.ts
import { Router, Request, Response } from 'express';

const router = Router();

// Datos simulados de productos
const products = [
  { id: 1, name: 'Camiseta Urban Classic', description: 'Camiseta de algodón premium', price: 65000, category: 'Camisetas', stock: 30, image: '' },
  { id: 2, name: 'Jean Slim Fit', description: 'Jean ajustado moderno', price: 120000, category: 'Pantalones', stock: 15, image: '' },
  { id: 3, name: 'Hoodie VibePulse', description: 'Buzo con capucha estampado', price: 95000, category: 'Buzos', stock: 8, image: '' },
  { id: 4, name: 'Chaqueta Street', description: 'Chaqueta estilo urbano', price: 180000, category: 'Chaquetas', stock: 5, image: '' },
  { id: 5, name: 'Shorts Sport', description: 'Short deportivo ligero', price: 55000, category: 'Shorts', stock: 22, image: '' },
];

// Datos simulados de usuarios
const users = [
  { id: 1, name: 'Admin VibePulse', email: 'admin@vibe.com', role: 'ADMIN', createdAt: new Date().toISOString() },
  { id: 2, name: 'Laura Gómez', email: 'laura@mail.com', role: 'CLIENT', createdAt: new Date().toISOString() },
  { id: 3, name: 'Carlos Ruiz', email: 'carlos@mail.com', role: 'CLIENT', createdAt: new Date().toISOString() },
  { id: 4, name: 'Ana Torres', email: 'ana@mail.com', role: 'CLIENT', createdAt: new Date().toISOString() },
  { id: 5, name: 'Julián Castro', email: 'julian@mail.com', role: 'CLIENT', createdAt: new Date().toISOString() },
];

// ── GET /products ─────────────────────────────────────────
// Retorna lista completa de productos
router.get('/', (req: Request, res: Response) => {
  res.json(products);
});

// ── GET /products/:id ─────────────────────────────────────
// Retorna un producto por ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  res.json(product);
});

// ── GET /users ────────────────────────────────────────────
// Retorna lista completa de usuarios
router.get('/users/all', (req: Request, res: Response) => {
  res.json(users);
});

export default router;
