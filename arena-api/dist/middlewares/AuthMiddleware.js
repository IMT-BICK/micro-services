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
const axios_1 = __importDefault(require("axios"));
const { AUTH_API_URL } = process.env;
exports.default = {
    auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.token;
            if (!token) {
                return res.status(401).json({
                    status: 401,
                    message: 'Unauthorized'
                });
            }
            try {
                const { data: user } = yield axios_1.default.post(AUTH_API_URL + '/verify', { token }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('user : ' + user.name);
                if (!req.cookies.access_token) {
                    res.cookie('access_token', token, { expires: new Date(Date.now() + 30 * 24 * 3600000) });
                }
                req.user = user;
                return next();
            }
            catch (e) {
                return res.status(403).json({
                    status: 403,
                    message: `L'authentification n'a pas pu être réalisée`
                });
            }
        });
    },
    guest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.token;
            if (token) {
                return res.status(403).json({
                    status: 403,
                    message: 'Unauthenticated endpoint'
                });
            }
            return next();
        });
    }
};
//# sourceMappingURL=AuthMiddleware.js.map