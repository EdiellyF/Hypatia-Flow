import express from 'express';
import { PrismaClient } from '@prisma/client';
import  router  from './routes/server.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app, prisma }; 