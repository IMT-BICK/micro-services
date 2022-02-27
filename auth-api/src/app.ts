import 'dotenv/config';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import Auth from './Auth';
import axios from 'axios';

const { USERS_API_URL } = process.env; 

const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.post('/generate', async (req: Request, res: Response): Promise<Response> => {
    const user: Object = req.body;

    const response = await axios.post(USERS_API_URL + '/check', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        return res.status(403).json({
            status: 403,
            message: response.data.message
        });
    }

    const token = Auth.genToken(response.data);

    return res.status(200).json({
        token
    });

});

app.post('/verify', (req: Request, res: Response): Response => {
    const { token } = req.body;

    const user = Auth.checkToken(token);
    
    if (!user) {
        return res.status(403).json({
            status: 403,
            message: `L'intégrité du token n'a pas pu être vérifiée.`
        });
    }

    return res.status(200).json(user);
});

export default app;