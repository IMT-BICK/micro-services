"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MatchController_1 = __importDefault(require("./MatchController"));
const AuthMiddleware_1 = __importDefault(require("./middlewares/AuthMiddleware"));
const router = (0, express_1.Router)();
router.get('/', AuthMiddleware_1.default.auth, MatchController_1.default.getMatches);
router.post('/', AuthMiddleware_1.default.auth, MatchController_1.default.postMatch);
exports.default = router;
//# sourceMappingURL=router.js.map