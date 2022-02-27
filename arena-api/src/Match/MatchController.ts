import 'dotenv/config';
import { Response } from "express";
import { Match } from "./Match";
import MatchRepository from "./MatchRepository"
import axios from 'axios';

const { USERS_API_URL } = process.env;

export default {

    getMatches(req: any, res: Response): Response {
        let matches: Match[];

        if (req.user.admin) {
            matches = MatchRepository.getMatches() || [];
        } else {
            matches = MatchRepository.getUserMatches(req.user.id) || [];
        }

        return res.status(200).json(matches);
    },

    getMatch(req: any, res: Response) {
        const id: string = req.params.id;
        const match: Match = MatchRepository.getMatch(id);

        if (!match) {
            return res.status(404).json({
                status: 404,
                message: `Le match n'existe pas`
            });
        }

        if (match.challenger_id !== req.user.id && match.challengee_id !== req.user.id && !req.user.admin) {
            return res.status(403).json({
                status: 403,
                message: `Vous n'avez pas la permission de voir ce match`
            });
        }
    
        return res.status(200).json(match);
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
            
            const challengerMatchesCount: number = MatchRepository.getUserMatches(challenger).length;
            const challengeeMatchesCount: number = MatchRepository.getUserMatches(challengee).length;
            
            if (challengerMatchesCount >= 3) {
                return res.status(403).json({
                    status: 403,
                    message: 'Vous ne pouvez pas avoir plus de 3 combats à la fois'
                });
            }

            if (challengeeMatchesCount >= 3) {
                return res.status(403).json({
                    status: 403,
                    message: `Votre adversaire a 3 matches en cours et ne peut donc pas être invité à un autre match`
                });
            }
    
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
    },

    getInvites(req: any, res: Response): Response {
        const challengee: string = req.user.id;
        const invites: Match[] = MatchRepository.getInvites(challengee) || [];

        return res.status(200).json(invites);
    },

    putInvite(req: any, res: Response): Response {
        const matchId: string = req.params.id;
        const match: Match = MatchRepository.getInvite(matchId);

        if (!match) {
            return res.status(404).json({
                status: 404,
                message: `L'invitation pour le match ${matchId} n'est plus valable, ou le match n'existe pas`
            });
        }

        if (match.challengee_id !== req.user.id) {
            return res.status(403).json({
                status: 403,
                message: `Vous n'avez pas la permission d'accepter ce combat`
            });
        }

        MatchRepository.acceptInvite(matchId);

        return res.status(200).json({
            message: 'Le match a bien été accepté et va avoir lieu !'
        });
    }

}