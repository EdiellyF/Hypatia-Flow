import { Router } from 'express';
import {authMiddleware} from '../middleware/auth.js';
import { DisciplinaController } from '../controllers/disciplinaController.js';
import { DisciplinaRepository } from '../repository/disciplinaRepository.js';
import { DisciplinaService } from '../services/disciplinaService.js';
import { UserService } from '../services/userService.js';
import { UserRepository } from '../repository/userRepository.js';
import { EmailService } from '../services/emailService.js';


const userRepository = new UserRepository();
const disciplinaRepository = new DisciplinaRepository();

const emailService = new EmailService();
const userService = new UserService(userRepository, emailService);
const disciplinaService = new DisciplinaService(disciplinaRepository, userService);


const disciplinaController = new DisciplinaController(disciplinaService);

const router = Router();

router.post('/', authMiddleware, (req, res) => disciplinaController.createDisciplina(req, res));

router.delete('/:id', authMiddleware,(req, res) => disciplinaController.deleteDisciplinaById(req,res))

export { router };