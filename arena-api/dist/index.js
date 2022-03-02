"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
const PORT = (_a = process.env.NODE_PORT) !== null && _a !== void 0 ? _a : 5002;
app_1.default.listen(PORT, () => {
    (0, database_1.applyMigrations)();
    console.log(`En écoute sur 0.0.0.0:${PORT}`);
});
//# sourceMappingURL=index.js.map