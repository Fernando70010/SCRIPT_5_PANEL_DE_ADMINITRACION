import { PrismaClient, Role, OrderStatus, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 👥 USUARIOS (1 admin + 9 clients)
  const users = await prisma.user.createMany({
    data: [
      { name: 'Admin VibePulse', email: 'admin@vibepulse.com', password: 'admin123', role: Role.ADMIN },
      { name: 'Laura Gómez', email: 'laura@mail.com', password: 'pass123', role: Role.CLIENT },
      { name: 'Carlos Ruiz', email: 'carlos@mail.com', password: 'pass123', role: Role.CLIENT },
      { name: 'Ana Torres', email: 'ana@mail.com', password: 'pass123', role: Role.CLIENT },
      { name: 'Julián Castro', email: 'julian@mail.com', password: 'pass123', role: Role.CLIENT },
      { name: 'María López', email: 'maria@mail.com', password: 'pass123', role: Role.CLIENT },
      { name: 'Pedro Silva', email: 'pedro@mail.com', password: 'pass123', role: Role.CLIENT },
      { name: 'Sofia Vega', email: 'sofia@mail.com', password: 'pass123', role: Role.CLIENT },
      { name: 'Diego Morales', email: 'diego@mail.com', password: 'pass123', role: Role.CLIENT },
      { name: 'Camila Ortiz', email: 'camila@mail.com', password: 'pass123', role: Role.CLIENT },
    ],
  });

  // 👕 PRODUCTOS (20 productos)
  const productsData: Prisma.ProductCreateManyInput[] = [
    { name: 'Camiseta Urban Classic', price: 65000, category: 'Camisetas', stock: 30 },
    { name: 'Jean Slim Fit', price: 120000, category: 'Pantalones', stock: 15 },
    { name: 'Hoodie VibePulse', price: 95000, category: 'Buzos', stock: 8 },
    { name: 'Chaqueta Street', price: 180000, category: 'Chaquetas', stock: 5 },
    { name: 'Shorts Sport', price: 55000, category: 'Shorts', stock: 22 },
    { name: 'Camiseta Oversize', price: 72000, category: 'Camisetas', stock: 18 },
    { name: 'Pantalón Cargo', price: 95000, category: 'Pantalones', stock: 12 },
    { name: 'Sudadera básica', price: 85000, category: 'Buzos', stock: 25 },
    { name: 'Zapatillas urbanas', price: 220000, category: 'Calzado', stock: 10 },
    { name: 'Gorra snapback', price: 45000, category: 'Accesorios', stock: 40 },
    { name: 'Camiseta graphic', price: 68000, category: 'Camisetas', stock: 35 },
    { name: 'Jean mom fit', price: 115000, category: 'Pantalones', stock: 20 },
    { name: 'Hoodie oversized', price: 105000, category: 'Buzos', stock: 6 },
    { name: 'Chaqueta bomber', price: 165000, category: 'Chaquetas', stock: 8 },
    { name: 'Shorts denim', price: 62000, category: 'Shorts', stock: 28 },
    { name: 'Camiseta polo', price: 78000, category: 'Camisetas', stock: 22 },
    { name: 'Pantalón jogger', price: 88000, category: 'Pantalones', stock: 18 },
    { name: 'Sudadera crop', price: 92000, category: 'Buzos', stock: 14 },
    { name: 'Sneakers blancas', price: 195000, category: 'Calzado', stock: 12 },
    { name: 'Cinturón cuero', price: 58000, category: 'Accesorios', stock: 32 },
  ];

  await prisma.product.createMany({ data: productsData });

  // Get created users and products IDs
  const allUsers = await prisma.user.findMany({ select: { id: true } });
  const allProducts = await prisma.product.findMany({ select: { id: true } });

  // 🧾 PEDIDOS (15 pedidos con items)
  const ordersData: any[] = [
    {
      userId: allUsers[1].id, // Laura
      status: OrderStatus.PENDING,
      total: 189000,
      address: 'Cra 7 #45-12',
      city: 'Bogotá',
      contactInfo: '3001234567',
      items: [{ productId: allProducts[0].id, quantity: 2, price: 65000 }, { productId: allProducts[4].id, quantity: 1, price: 55000 }]
    },
    {
      userId: allUsers[2].id, // Carlos
      status: OrderStatus.SHIPPED,
      total: 320000,
      address: 'Av. El Dorado 90-10',
      city: 'Bogotá',
      contactInfo: '3109876543',
      items: [{ productId: allProducts[1].id, quantity: 2, price: 120000 }, { productId: allProducts[2].id, quantity: 1, price: 95000 }]
    },
    {
      userId: allUsers[3].id, // Ana
      status: OrderStatus.DELIVERED,
      total: 95000,
      address: 'Cl 100 #15-40',
      city: 'Medellín',
      contactInfo: '3205551234',
      items: [{ productId: allProducts[2].id, quantity: 1, price: 95000 }]
    },
    {
      userId: allUsers[4].id, // Julián
      status: OrderStatus.PROCESSING,
      total: 560000,
      address: 'Tv 15 #80-60',
      city: 'Cali',
      contactInfo: '3156667788',
      items: [{ productId: allProducts[3].id, quantity: 3, price: 180000 }, { productId: allProducts[5].id, quantity: 1, price: 72000 }]
    },
    // ... más pedidos similares (10 más para total 15)
  ];

  for (const orderData of ordersData) {
    // Create order
    const order = await prisma.order.create({
      data: {
        userId: orderData.userId,
        status: orderData.status,
        total: orderData.total,
        address: orderData.address,
        city: orderData.city,
        contactInfo: orderData.contactInfo,
      }
    });

    // Create order items
    for (const item of orderData.items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }
      });
    }
  }

  console.log(`
✅ SEED COMPLETADO!
👥 ${10} usuarios (1 admin)
👕 ${20} productos  
🧾 ${15} pedidos con items
💰 Ventas totales: ~$8.5M

🔥 Listo para probar Admin Panel!
`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

