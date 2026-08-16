import express from 'express';
import { getPets, getPetById } from '../controllers/pets.controllers';
import { validateNumericId, pleaseAuth } from '../middlewares/pets.middleware';
import type { Router } from 'express';

export const petRouter: Router = express.Router();

petRouter.get('/', getPets);
petRouter.get('/:id', pleaseAuth, validateNumericId, getPetById);
