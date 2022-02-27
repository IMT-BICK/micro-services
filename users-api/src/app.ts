import express from 'express';
import bodyParser from 'body-parser';

/**
 * Instanciation Express et middlewares
 */
const app = express();
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

/**
 * Appel des routeurs
 */
import router from './router';
app.use(router);

export default app;