import express from 'express';
import routes from './routes';
import cors from 'cors';
import prisma from './prismaClient';

const app = express();
const port = 3000;

app.use(cors({   
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
    }));

app.use(express.json()); 

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});