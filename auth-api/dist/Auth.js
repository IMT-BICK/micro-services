"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = require("jsonwebtoken");
const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, '../private.key'));
exports.default = {
    genToken(user) {
        return (0, jsonwebtoken_1.sign)({
            user: user,
            exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 30)
        }, privateKey, { algorithm: 'RS256' });
    },
    checkToken(token) {
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, privateKey, { algorithms: ['RS256'] });
            return payload.user;
        }
        catch (e) {
            return false;
        }
    }
};
//# sourceMappingURL=Auth.js.map