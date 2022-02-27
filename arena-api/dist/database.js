"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMigrations = exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
exports.db = new better_sqlite3_1.default('arena.db', {
    verbose: console.log
});
function applyMigrations() {
    const file = fs_1.default.readFileSync('schema.sql', 'utf-8');
    exports.db.exec(file);
}
exports.applyMigrations = applyMigrations;
;
//# sourceMappingURL=database.js.map