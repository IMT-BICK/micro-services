import 'dotenv/config';
import axios from 'axios';

const { AUTH_API_URL } = process.env;

export default {

    async auth (req: any, res: any, next: any) {
        const token = req.token;

        console.log('token : ' + token);

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized'
            });
        }

        try {
            const { data: user } = await axios.post(AUTH_API_URL + '/verify', { token }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('user : ' + user.name);

            if (!req.cookies.access_token) {
                res.cookie('access_token', token, { expires: new Date(Date.now() + 30 * 24 * 3600000) });
            }

            req.user = user;
            return next();
        } catch (e) {
            return res.status(403).json({
                status: 403,
                message: `L'authentification n'a pas pu être réalisée`
            });
        }
    },

    async guest (req: any, res: any, next: any) {
        const token = req.token;

        if (token) {
            return res.status(403).json({
                status: 403,
                message: 'Unauthenticated endpoint'
            });
        }

        return next();
    }

};