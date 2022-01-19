import express from 'express';
import * as bodyParser from 'body-parser';
const app = express();

import users from './users';

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.get('/', (req, res) => {
    return res.status(200).send('Hello World');
});

app.use('/user', users);

export default app;