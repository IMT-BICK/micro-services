import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import RoundController from './RoundController';

const router = Router();

router.post('/', AuthMiddleware.auth, RoundController.postRound);

export default router;