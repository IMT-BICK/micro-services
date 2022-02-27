import 'dotenv/config';
import app from './app';

import UserRepository from './UserRepository';

const port = process.env.NODE_PORT ?? 5000;
app.listen(port, () => {
    UserRepository.applyMigration();

    console.log(`En écoute sur 0.0.0.0:${port}`);
});