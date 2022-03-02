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
require("dotenv/config");
const MatchRepository_1 = __importDefault(require("./MatchRepository"));
const axios_1 = __importDefault(require("axios"));
const { USERS_API_URL } = process.env;
exports.default = {
    getMatches(req, res) {
        let matches;
        if (req.user.admin) {
            matches = MatchRepository_1.default.getMatches() || [];
        }
        else {
            matches = MatchRepository_1.default.getUserMatches(req.user.id) || [];
        }
        return res.status(200).json(matches);
    },
    getMatch(req, res) {
        const id = req.params.id;
        const match = MatchRepository_1.default.getMatch(id);
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
    postMatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const challengee = req.body.challengee;
            const challenger = req.user.id;
            if (challengee === challenger) {
                return res.status(403).json({
                    status: 403,
                    message: 'Vous ne pouvez pas créer de match contre vous-même'
                });
            }
            try {
                yield axios_1.default.get(`${USERS_API_URL}/${challengee}`, {
                    headers: {
                        'Authorization': `Bearer ${req.token}`
                    }
                });
                const challengerMatchesCount = MatchRepository_1.default.getUserMatches(challenger).length;
                const challengeeMatchesCount = MatchRepository_1.default.getUserMatches(challengee).length;
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
                MatchRepository_1.default.createMatch(challenger, challengee);
                return res.status(201).json({
                    message: 'Le match a été créé'
                });
            }
            catch (e) {
                return res.status(404).json({
                    status: 404,
                    message: `L'adversaire n'existe pas`
                });
            }
        });
    },
    getInvites(req, res) {
        const challengee = req.user.id;
        const invites = MatchRepository_1.default.getInvites(challengee) || [];
        return res.status(200).json(invites);
    },
    putInvite(req, res) {
        const matchId = req.params.id;
        const match = MatchRepository_1.default.getInvite(matchId);
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
        MatchRepository_1.default.acceptInvite(matchId);
        return res.status(200).json({
            message: 'Le match a bien été accepté et va avoir lieu !'
        });
    }
};
//# sourceMappingURL=MatchController.js.map