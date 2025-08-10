import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { router as userRouter } from '../src/routes/userRouter.js';
import { router as disciplinaRouter } from '../src/routes/disciplinaRouter.js';
import { router as sessaoRouter } from '../src/routes/sessaoRouter.js';


const globalForPrisma = globalThis;
if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
}
const prisma = globalForPrisma.prisma;

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
    maxAge: 86400
};

app.use(cors(corsOptions));
app.use(express.json());


app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/user', userRouter);
app.use('/api/disciplina', disciplinaRouter);
app.use('/api/sessao', sessaoRouter);


const handler = async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {

        console.log('Request:', {
            method: req.method,
            path: req.url,
            query: req.query,
            body: req.body
        });


        await new Promise((resolve, reject) => {
            app(req, res, (err) => {
                if (err) {
                    console.error('Express error:', err);
                    reject(err);
                }
                resolve();
            });
        });
    } catch (error) {
        console.error('Handler error:', error);
        if (!res.headersSent) {
            res.status(500).json({ 
                error: 'Internal Server Error', 
                message: error.message,
                path: req.url
            });
        }
    }
};

export default handler;