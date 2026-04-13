// server/src/index.ts
import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Rutas ─────────────────────────────────────────────────
app.use('/api/admin/products', productsRouter);
app.use('/api/admin/users', productsRouter);
app.use('/api/admin/orders', ordersRouter);
app.use('/api/admin/dashboard', (req, res) => {
  res.redirect('/api/admin/orders/metrics/summary');
});

// ── Inicio del servidor ───────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
