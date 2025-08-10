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

export default function handler(req, res) {
  app(req, res); 
}



export { app, prisma }; 