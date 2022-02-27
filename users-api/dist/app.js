"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
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
/**
 * Appel des routeurs
 */
const router_1 = __importDefault(require("./router"));
app.use(router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map