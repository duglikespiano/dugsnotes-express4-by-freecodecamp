import express from 'express';
import type { Express } from 'express';
import http from 'http';
import { pets } from './data/pets';

const app: Express = express();
const server = http.createServer(app);
const PORT = 8000;

app.get('/', (req, res) => {
	res.json(pets);
});

server.listen(PORT, (): void => {
	console.log(`Server is running on port ${PORT}`);
});
