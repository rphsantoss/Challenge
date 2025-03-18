import express from 'express';
import routes from './routes';
import cors from 'cors';
import prisma from './prismaClient';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json()); 

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});