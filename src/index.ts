import express from 'express';
import type { Express, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { petRouter } from './routes/pets.routes';

const app: Express = express();
const server = http.createServer(app);
const PORT = 8000;

app.use(cors());

app.use('/pets', petRouter);

app.use((req: Request, res: Response<{ message: string }>): void => {
	res.json({ message: 'page not found' });
});

server.listen(PORT, (): void => {
	console.log(`Server is running on port ${PORT}`);
});
