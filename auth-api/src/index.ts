import 'dotenv/config';
import app from './app';

const PORT = process.env.NODE_PORT ?? 5001;
app.listen(PORT, () => {
    console.log(`En écoute sur 0.0.0.0:${PORT}`);
});