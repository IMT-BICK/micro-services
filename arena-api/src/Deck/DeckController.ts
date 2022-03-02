import { Response } from 'express';
import { Match } from '../Match/Match';
import MatchRepository from '../Match/MatchRepository';
import DeckRepository from './DeckRepository';

import PokemonRepository from './PokemonRepository';

export default {

    getDecks(req: any, res: Response): Response {
        const decks = DeckRepository.getDecks();

        return res.status(200).json(decks);
    },

    getDecksByMatch(req: any, res: Response): Response {
        const user = req.user.id;
        const match = req.params.match;

        const decks = DeckRepository.getDecksByMatchAndUser(match, user);

        return res.status(200).json(decks);
    },

    async postDeck(req: any, res: Response): Promise<Response> {
        const data = req.body;

        if (!data.match) {
            return res.status(400).json({
                status: 400,
                message: 'Merci de préciser un ID de match'
            });
        }

        const userMatches: Match[] = MatchRepository.getUserMatches(req.user.id);

        if (!userMatches.find((match: Match) => match.id === data.match)) {
            return res.status(403).json({
                status: 403,
                message: `Vous n'avez pas la permission de participer à ce match`
            });
        }

        if (!data.pokemon) {
            return res.status(400).json({
                status: 400,
                message: 'Merci de préciser un ID ou un nom de Pokémon'
            });
        }

        try {
            const pokemon = await PokemonRepository.getPokemon(data.pokemon);
            if (DeckRepository.isInDeck(pokemon.id, data.match, req.user.id)) {
                return res.status(403).json({
                    status: 403,
                    message: 'Ce Pokémon est déjà dans votre deck'
                });
            }

            if (DeckRepository.getDecksByMatchAndUser(data.match, req.user.id).length >= 10) {
                return res.status(403).json({
                    status: 403,
                    message: 'Votre deck peut comporter au maximum 10 Pokémon'
                });
            }

            DeckRepository.createDeck(data.match, pokemon.id, req.user.id);

            return res.status(201).json({
                message: `Ce Pokémon a bien été ajouté à votre deck`
            });
        } catch (e) {
            return res.status(404).json({
                status: 404,
                message: e.message
            });
        }
    }

};