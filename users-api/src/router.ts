import UserController from './UserController';
import { Router } from 'express';

import AuthMiddleware from './middlewares/AuthMiddleware';

const router = Router();

router.get('/', AuthMiddleware.auth, UserController.getUsers);
router.get('/:id', AuthMiddleware.auth, UserController.getUserById);
router.post('/', AuthMiddleware.guest, UserController.postUser);
router.post('/check', AuthMiddleware.guest, UserController.checkUser);

export default router;