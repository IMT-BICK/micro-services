import { Response } from 'express';
import { Match } from '../Match/Match';
import { Deck } from '../Deck/Deck';
import DeckRepository from '../Deck/DeckRepository';
import MatchRepository from '../Match/MatchRepository';
import RoundRepository from './RoundRepository';
import { Round } from './Round';

export default {

    postRound(req: any, res: Response): Response {
        const deckId: string = req.body.deck;
        const user = req.user;

        const deck: Deck = DeckRepository.getDeck(deckId);
        const match: Match = MatchRepository.getMatch(deck.match_id);

        if (deck.user_id !== user.id) {
            return res.status(403).json({
                status: 403,
                message: 'Vous ne pouvez pas jouer avec un deck qui ne vous appartient pas'
            });
        }

        if (!DeckRepository.hasEqualDecks(match)) {
            return res.status(403).json({
                status: 403,
                message: 'Les deux joueurs doivent avoir le même nombre de Pokémon dans leurs decks pour jouer'
            });
        }

        if (match.challenger_id === user.id) {
            const round: boolean|Round = RoundRepository.hasWaitingChallengerRound(match.id);

            if (round) {
                //
            }
        }
    }

};