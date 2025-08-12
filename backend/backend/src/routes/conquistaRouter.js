import express from 'express';
import { getConquistas, getNivel, postCheck } from '../controllers/conquistaController.js';

const router = express.Router();

router.get('/:userId', getConquistas);
router.get('/nivel/:userId', getNivel);
router.post('/check/:userId', postCheck);

export { router };