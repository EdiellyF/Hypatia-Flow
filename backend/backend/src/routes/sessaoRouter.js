import { SessaoRepository } from '../repository/sessaoRepository.js';
import { DisciplinaRepository } from '../repository/disciplinaRepository.js';
import { UserRepository } from '../repository/userRepository.js';
import { DisciplinaService } from '../services/disciplinaService.js';
import { SessaoService } from '../services/sessaoService.js';
import { UserService } from '../services/userService.js';
import { EmailService } from '../services/emailService.js';
import { SessaoController } from '../controllers/sessaoController.js';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();


const userService = new UserService(new UserRepository(), new EmailService());
const disciplinaService = new DisciplinaService(
    new DisciplinaRepository(),
    userService
);

const sessaoRepository = new SessaoRepository();
const sessaoService = new SessaoService(sessaoRepository, userService, disciplinaService);
const sessaoController = new SessaoController(sessaoService);


router.post('/', authMiddleware , (req, res) => sessaoController.criarSessao(req, res));
router.get('/user/:id', authMiddleware, (req, res) => sessaoController.buscarSessoesPorUsuario(req, res));


export { router };


