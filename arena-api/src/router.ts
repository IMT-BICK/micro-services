import { Router } from 'express';
import MatchController from './MatchController';
import AuthMiddleware from './middlewares/AuthMiddleware';

const router = Router();

router.get('/', AuthMiddleware.auth, MatchController.getMatches);
router.post('/', AuthMiddleware.auth, MatchController.postMatch);

export default router;