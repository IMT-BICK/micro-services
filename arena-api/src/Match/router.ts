import { Router } from 'express';
import MatchController from './MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/', AuthMiddleware.auth, MatchController.getMatches);
router.get('/:id', AuthMiddleware.auth, MatchController.getMatch);
router.post('/', AuthMiddleware.auth, MatchController.postMatch);

router.get('/invite', AuthMiddleware.auth, MatchController.getInvites);
router.put('/invite/:id', AuthMiddleware.auth, MatchController.putInvite);

export default router;