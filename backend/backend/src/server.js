import express from 'express';
import { PrismaClient } from '@prisma/client';
import routes from './routes/index.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export { app, prisma }; 