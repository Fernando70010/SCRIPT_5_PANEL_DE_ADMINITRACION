# 🛍️ VibePulse E-Commerce — Sprint 5: Panel de Administración

## Grupo 5
- Valentina Tapia
- Esteban Molina
- Nicolás Velandia
- Fernando Fajardo
- Jhostin Pinzón

---

## 📋 Objetivo
Panel administrativo del e-commerce VibePulse que permite visualizar indicadores generales del sistema y gestionar información clave.

## 🚀 Stack Tecnológico
- **Frontend:** React + Vite + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Base de datos:** PostgreSQL
- **ORM:** Prisma

---

## ⚙️ Cómo correr el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/ecommerce-vibe-pulse.git
cd ecommerce-vibe-pulse
```

### 2. Instalar dependencias del frontend
```bash
cd client
npm install
```

### 3. Instalar dependencias del backend
```bash
cd ../server
npm install
```

### 4. Configurar variables de entorno
Crear archivo `.env` en `/server`:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/vibedb"
JWT_SECRET="tu_secreto_aqui"
PORT=3000
```

### 5. Correr el frontend
```bash
cd client
npm run dev
```

### 6. Correr el backend
```bash
cd server
npm run dev
```

---

## 📁 Estructura del proyecto
```
ecommerce-vibe-pulse/
├── client/
│   └── src/
│       ├── components/     # Componentes reutilizables
│       ├── pages/          # Páginas del panel admin
│       ├── layouts/        # Layout del admin
│       ├── services/       # Llamadas a la API
│       ├── hooks/          # Custom hooks
│       ├── types/          # Tipos TypeScript
│       └── routes/         # Rutas del frontend
├── server/
│   └── src/
│       ├── controllers/    # Lógica de negocio
│       ├── routes/         # Endpoints de la API
│       ├── services/       # Servicios
│       ├── middleware/      # Auth, validaciones
│       └── config/         # Configuración
├── prisma/
│   └── schema.prisma
└── README.md
```
