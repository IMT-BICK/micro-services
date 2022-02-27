"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MatchRepository_1 = __importDefault(require("../Match/MatchRepository"));
const DeckRepository_1 = __importDefault(require("./DeckRepository"));
const PokemonRepository_1 = __importDefault(require("./PokemonRepository"));
exports.default = {
    getDecks(req, res) {
        const decks = DeckRepository_1.default.getDecks();
        return res.status(200).json(decks);
    },
    getDecksByMatch(req, res) {
        const user = req.user.id;
        const match = req.params.match;
        const decks = DeckRepository_1.default.getDecksByMatchAndUser(match, user);
        return res.status(200).json(decks);
    },
    postDeck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (!data.match) {
                return res.status(400).json({
                    status: 400,
                    message: 'Merci de préciser un ID de match'
                });
            }
            const userMatches = MatchRepository_1.default.getUserMatches(req.user.id);
            if (!userMatches.find((match) => match.id === data.match)) {
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
                const pokemon = yield PokemonRepository_1.default.getPokemon(data.pokemon);
                const hp = pokemon.stats.find((item) => item.stat.name === 'hp').base_stat;
                console.log(hp);
                if (DeckRepository_1.default.isInDeck(pokemon.id, data.match, req.user.id)) {
                    return res.status(403).json({
                        status: 403,
                        message: 'Ce Pokémon est déjà dans votre deck'
                    });
                }
                if (DeckRepository_1.default.getDecksByMatchAndUser(data.match, req.user.id).length >= 10) {
                    return res.status(403).json({
                        status: 403,
                        message: 'Votre deck peut comporter au maximum 10 Pokémon'
                    });
                }
                DeckRepository_1.default.createDeck(data.match, pokemon.id, req.user.id, hp);
                return res.status(201).json({
                    message: `Ce Pokémon a bien été ajouté à votre deck`
                });
            }
            catch (e) {
                return res.status(404).json({
                    status: 404,
                    message: e.message
                });
            }
        });
    }
};
//# sourceMappingURL=DeckController.js.map