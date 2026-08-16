import express from 'express';
import type { Express, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { pets } from './data/pets';
import type { Pet } from './data/pets';

const app: Express = express();
const server = http.createServer(app);
const PORT = 8000;

app.use(cors());

app.get('/', (req: Request, res: Response<Pet[]>): void => {
	res.json(pets);
});

app.get('/:id', (req: Request<{ id: string }>, res: Response<Pet | { message: string }>): void => {
	const { id } = req.params;
	const pet: Pet | undefined = pets.find((pet: Pet): boolean => pet.id.toString() === id);
	if (pet) {
		res.json(pet);
	} else {
		res.status(404).json({ message: 'No pet with the ID' });
	}
});

app.use((req: Request, res: Response<{ message: string }>): void => {
	res.json({ message: 'page not found' });
});

server.listen(PORT, (): void => {
	console.log(`Server is running on port ${PORT}`);
});
