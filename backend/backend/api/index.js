import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import userRouter from '../src/routes/userRouter.js';
import disciplinaRouter from '../src/routes/disciplinaRouter.js';
import sessaoRouter from '../src/routes/sessaoRouter.js';

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

// Rotas da API
app.use('/api/users', userRouter);
app.use('/api/disciplinas', disciplinaRouter);
app.use('/api/sessoes', sessaoRouter);

// Rota de teste para verificar se a API está funcionando
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    try {
        await app(req, res);
    } catch (error) {
        console.error('Error in Vercel handler:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}