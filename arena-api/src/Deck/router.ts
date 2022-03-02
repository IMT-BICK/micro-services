import { Router } from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import DeckController from './DeckController';

const router = Router();

router.get('/', DeckController.getDecks);
router.get('/:match', AuthMiddleware.auth, DeckController.getDecksByMatch);
router.post('/', AuthMiddleware.auth, DeckController.postDeck);

export default router;