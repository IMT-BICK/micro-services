import fs from 'fs';
import path from 'path';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

const privateKey = fs.readFileSync(path.join(__dirname, '../private.key'));

export default {

    genToken(user: Object): string {
        return sign({
            user: user,
            exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 30)
        }, privateKey, { algorithm: 'RS256' });
    },

    checkToken(token: string): boolean|Object {
        try {
            const payload = verify(token, privateKey, { algorithms: ['RS256'] }) as JwtPayload;
            return payload.user;
        } catch (e) {
            console.error(e.message);
        }
    }

};