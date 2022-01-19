import { Router, Request, Response} from 'express';
import users from './users.json';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    return res.json(users);
});

router.get('/:name', (req: Request, res: Response) => {
    const name = req.params.name;

    const user: Object = users.find(user => user.name === name);

    return res.json(user);
});

export default router;