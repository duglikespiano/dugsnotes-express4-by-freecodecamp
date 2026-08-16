import express from 'express';
import type { Express, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { pets } from './data/pets';
import type { Pet } from './data/pets';

const app: Express = express();
const server = http.createServer(app);
const PORT = 8000;

type PetQueryParams = {
	species?: string;
	adopted?: 'true' | 'false';
	minAge?: string;
	maxAge: string;
};

app.use(cors());

app.get('/', (req: Request<{}, unknown, {}, PetQueryParams>, res: Response<Pet[]>): void => {
	const { species, adopted, minAge, maxAge } = req.query;
	let filteredPets: Pet[] = pets;
	if (species) {
		filteredPets = filteredPets.filter((pet: Pet): boolean => pet.species.toLowerCase() === species.toLowerCase());
	}
	if (adopted) {
		filteredPets = filteredPets.filter((pet: Pet): boolean => pet.adopted === JSON.parse(adopted));
	}
	if (minAge) {
		filteredPets = filteredPets.filter((pet: Pet): boolean => pet.age >= JSON.parse(minAge));
	}
	if (maxAge) {
		filteredPets = filteredPets.filter((pet: Pet): boolean => pet.age <= JSON.parse(maxAge));
	}
	res.json(filteredPets);
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
