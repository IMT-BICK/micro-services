import app from './app';

import MatchRepository from './MatchRepository';

const PORT = process.env.NODE_PORT ?? 5002;
app.listen(PORT, () => {
    MatchRepository.applyMigrations();
    console.log(`En écoute sur 0.0.0.0:${PORT}`);
});