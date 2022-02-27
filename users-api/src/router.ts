import UserController from './UserController';
import { Router } from 'express';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.postUser);
router.post('/check', UserController.checkUser);

export default router;