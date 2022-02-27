import 'dotenv/config';
import { Request, Response } from "express";
import { Match } from "./Match";
import MatchRepository from "./MatchRepository"
import axios from 'axios';

const { USERS_API_URL } = process.env;

export default {

    getMatches(req: Request, res: Response): Response {
        const matches: Match[] = MatchRepository.getMatches() || [];

        return res.status(200).json(matches);
    },

    async postMatch(req: any, res: Response): Promise<Response> {
        const challengee: string = req.body.challengee;
        const challenger: string = req.user.id;

        if (challengee === challenger) {
            return res.status(403).json({
                status: 403,
                message: 'Vous ne pouvez pas créer de match contre vous-même'
            });
        }
        
        try {
            await axios.get(`${USERS_API_URL}/${challengee}`, {
                headers: {
                    'Authorization': `Bearer ${req.token}`
                }
            });
    
            MatchRepository.createMatch(challenger, challengee);

            return res.status(201).json({
                message: 'Le match a été créé'
            });
        } catch (e) {
            return res.status(404).json({
                status: 404,
                message: `L'adversaire n'existe pas`
            });
        }
    }

}