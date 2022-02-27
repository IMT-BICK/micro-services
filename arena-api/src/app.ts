import bodyParser from 'body-parser';
import express from 'express';
import bearerToken from 'express-bearer-token';
import cookieParser from 'cookie-parser';

import MatchRouter from './Match/router';
import DeckRouter from './Deck/router';

const app = express();

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.use(bearerToken());
app.use(cookieParser());

app.use('/match', MatchRouter);
app.use('/deck', DeckRouter);

export default app;