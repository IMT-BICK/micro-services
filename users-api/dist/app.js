"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_bearer_token_1 = __importDefault(require("express-bearer-token"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
/**
 * Instanciation Express et middlewares
 */
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({
    limit: '50mb',
    verify(req, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use((0, express_bearer_token_1.default)({
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token',
    cookie: {
        signed: false,
        secret: '',
        key: 'access_token'
    }
}));
app.use((0, cookie_parser_1.default)());
/**
 * Appel des routeurs
 */
const router_1 = __importDefault(require("./router"));
app.use(router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map