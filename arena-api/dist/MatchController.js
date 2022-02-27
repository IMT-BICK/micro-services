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
        const matches = MatchRepository_1.default.getMatches() || [];
        return res.status(200).json(matches);
    },
    postMatch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const challengee = req.body.challengee;
            const challenger = req.user.id;
            try {
                yield axios_1.default.get(`${USERS_API_URL}/${challengee}`, {
                    headers: {
                        'Authorization': `Bearer ${req.token}`
                    }
                });
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
    }
};
//# sourceMappingURL=MatchController.js.map