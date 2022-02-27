"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const uuid_1 = require("uuid");
const db = new better_sqlite3_1.default('matches.sql', {
    verbose: console.log
});
exports.default = {
    getMatches() {
        return db.prepare('SELECT * FROM matches').all();
    },
    getMatch(id) {
        return db.prepare('SELECT * FROM matches WHERE id = :id').get({ id });
    },
    getUserMatches(user) {
        return db.prepare('SELECT id, challenger_id, challengee_id FROM matches WHERE challenger_id = :id OR challengee_id = :id').all({ id: user });
    },
    createMatch(challenger, challengee) {
        const id = (0, uuid_1.v4)();
        return db.prepare('INSERT INTO matches (id, challenger_id, challengee_id) VALUES (?, ?, ?)').run(id, challenger, challengee);
    },
    getInvites(user) {
        const matches = db.prepare('SELECT * FROM matches WHERE challengee_id = :challengee_id').all({ challengee_id: user });
        return matches.filter(match => match.challengee_date === '');
    },
    getInvite(id) {
        const match = db.prepare('SELECT * FROM matches WHERE id = :id').get({ id });
        if (match.challengee_date !== '') {
            return null;
        }
        return match;
    },
    acceptInvite(id) {
        return db.prepare('UPDATE matches SET challengee_date = ? WHERE id = ?').run(new Date().toISOString(), id);
    },
    applyMigrations() {
        const file = fs_1.default.readFileSync('schema.sql', 'utf-8');
        db.exec(file);
    }
};
//# sourceMappingURL=MatchRepository.js.map