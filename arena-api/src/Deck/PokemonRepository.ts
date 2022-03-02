import 'dotenv/config';
import axios from 'axios';

const { POKEMON_API_URL } = process.env;

export default {
    async getPokemon(name: string) {
        const res = await axios.get(`${POKEMON_API_URL}/pokemon/${encodeURI(name)}`);
        return res.data;
    }
};