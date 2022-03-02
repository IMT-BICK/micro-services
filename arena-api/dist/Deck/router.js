"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const DeckController_1 = __importDefault(require("./DeckController"));
const router = (0, express_1.Router)();
router.get('/', DeckController_1.default.getDecks);
router.get('/:match', AuthMiddleware_1.default.auth, DeckController_1.default.getDecksByMatch);
router.post('/', AuthMiddleware_1.default.auth, DeckController_1.default.postDeck);
exports.default = router;
//# sourceMappingURL=router.js.map