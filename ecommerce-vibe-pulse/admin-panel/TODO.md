bu# TODO - Backend Admin Panel SPRINT 5

## ✅ Plan Aprobado
- [x] 1. Crear TODO.md (tracking)
- [ ] 2. server/src/index.ts (Express + Prisma)
- [ ] 3. middleware/auth.ts (JWT admin)
- [✅] 4. controllers/adminController.ts (Prisma queries)
- [✅] 5. routes/admin.ts (5 endpoints)
- [✅] 6. prisma/seed.ts (datos reales)
- [ ] 7. Test: migrate/seed/server
- [ ] 8. Frontend: quitar mocks

**🚀 TEST COMPLETO (ejecutar en orden):**
```
1. cd admin-panel\server && npm install
2. cd .. && prisma migrate dev --name admin-panel && npx prisma db seed
3. cd server && npm run dev
4. NEW TERMINAL: cd ../client && npm run dev  
5. http://localhost:5173/login → Click "Ingresar admin"
```
**Health check:** http://localhost:3001/health
