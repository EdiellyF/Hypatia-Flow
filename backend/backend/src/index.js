import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import router from './routes/server.js';

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
    maxAge: 86400
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);

// Configuração para ambiente de desenvolvimento
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

// Handler para Vercel
export default async function handler(req, res) {
    try {
        await app(req, res);
    } catch (error) {
        console.error('Error in Vercel handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
} 