import express from 'express';
import type { Express } from 'express';
import http from 'http';

const app: Express = express();
const server = http.createServer(app);
const PORT = 8000;

server.listen(PORT, (): void => {
	console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
	res.json({});
});
