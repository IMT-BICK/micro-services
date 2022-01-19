import dotenv from 'dotenv';
import app from './app';

dotenv.config();

app.listen(process.env.NODE_PORT, () => {
    console.log(`En écoute sur ${process.env.NODE_PORT}`);
});