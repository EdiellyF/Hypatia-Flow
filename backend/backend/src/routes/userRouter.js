import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { UserService } from '../services/userService.js';
import { UserRepository } from '../repository/userRepository.js';
import { EmailService } from '../services/emailService.js';



const emailService = new EmailService();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, emailService);
const userController = new UserController(userService);

const router = Router();

router.post("/login", (req, res) => {
    userController.loginUser(req, res);
});

router.post("/", (req, res) => {
     userController.createUser(req, res)
});

export { router };