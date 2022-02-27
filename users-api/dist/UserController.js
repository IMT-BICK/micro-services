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
const UserRepository_1 = __importDefault(require("./UserRepository"));
const controller = {
    getUsers: (req, res) => {
        return res.json(UserRepository_1.default.getAllUsers());
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        const user = UserRepository_1.default.getUserById(id);
        if (!user) {
            return res.status(401).json({
                message: 'Utilisateur introuvable'
            });
        }
        return res.json(user);
    },
    postUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        try {
            yield UserRepository_1.default.createUser(user);
            return res.status(201);
        }
        catch (e) {
            return res.status(500).json({
                error: true,
                message: e.message
            });
        }
    }),
    checkUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const verified = yield UserRepository_1.default.checkPassword(user);
        if (!verified) {
            return res.status(403).json({
                status: 403,
                message: 'Les mots de passe ne correspondent pas'
            });
        }
        return res.status(200).json(verified);
    })
};
exports.default = controller;
//# sourceMappingURL=UserController.js.map