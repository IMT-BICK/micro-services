import bodyParser from 'body-parser';
import express from 'express';
import bearerToken from 'express-bearer-token';
import cookieParser from 'cookie-parser';

import router from './router';

const app = express();

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.use(bearerToken());
app.use(cookieParser());

app.use(router);

export default app;