"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("./UserController"));
const express_1 = require("express");
const AuthMiddleware_1 = __importDefault(require("./middlewares/AuthMiddleware"));
const router = (0, express_1.Router)();
router.get('/', UserController_1.default.getUsers);
router.get('/:id', AuthMiddleware_1.default.auth, UserController_1.default.getUserById);
router.post('/', AuthMiddleware_1.default.guest, UserController_1.default.postUser);
router.post('/check', AuthMiddleware_1.default.guest, UserController_1.default.checkUser);
exports.default = router;
//# sourceMappingURL=router.js.map