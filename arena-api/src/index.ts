import app from './app';

import { applyMigrations } from './database';

const PORT = process.env.NODE_PORT ?? 5002;
app.listen(PORT, () => {
    applyMigrations();
    console.log(`En écoute sur 0.0.0.0:${PORT}`);
});