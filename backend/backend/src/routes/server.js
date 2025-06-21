import { Router } from 'express';
import { userRouter } from './userRouter.js'
import { disciplinaRouter } from './disciplinaRouter.js'
import sessaoRouter from './sessaoRouter.js'

const router = Router();

router.use('/user',  userRouter);
router.use('/disciplina',  disciplinaRouter);
router.use('/sessao', sessaoRouter);

export default router; 