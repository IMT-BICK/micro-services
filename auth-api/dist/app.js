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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Auth_1 = __importDefault(require("./Auth"));
const axios_1 = __importDefault(require("axios"));
const { USERS_API_URL } = process.env;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({
    limit: '50mb',
    verify(req, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.post('/generate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const response = yield axios_1.default.post(USERS_API_URL + '/check', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status !== 200) {
        return res.status(403).json({
            status: 403,
            message: response.data.message
        });
    }
    const token = Auth_1.default.genToken(response.data);
    return res.status(200).json({
        token
    });
}));
app.post('/verify', (req, res) => {
    const { token } = req.body;
    const user = Auth_1.default.checkToken(token);
    if (!user) {
        return res.status(403).json({
            status: 403,
            message: `L'intégrité du token n'a pas pu être vérifiée.`
        });
    }
    return res.status(200).json(user);
});
exports.default = app;
//# sourceMappingURL=app.js.map