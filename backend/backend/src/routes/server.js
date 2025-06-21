import { Router } from 'express';
import { userRouter } from './userRouter.js'
import { disciplinaRouter } from './disciplinaRouter.js'

const router = Router();


router.use('/user',  userRouter);
router.use('/disciplina',  disciplinaRouter);

export default router; 