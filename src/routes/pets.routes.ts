import express from 'express';
import { getPets, getPetById } from '../controllers/pets.controllers';
import type { Router } from 'express';

export const petRouter: Router = express.Router();

petRouter.get('/', getPets);
petRouter.get('/:id', getPetById);
