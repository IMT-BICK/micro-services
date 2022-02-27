"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const database_1 = require("../database");
exports.default = {
    getMatches() {
        return database_1.db.prepare('SELECT * FROM matches').all();
    },
    getMatch(id) {
        return database_1.db.prepare('SELECT * FROM matches WHERE id = :id').get({ id });
    },
    getUserMatches(user) {
        const matches = database_1.db.prepare('SELECT id, challenger_id, challengee_id FROM matches WHERE challenger_id = :id OR challengee_id = :id').all({ id: user });
        return matches;
    },
    createMatch(challenger, challengee) {
        const id = (0, uuid_1.v4)();
        return database_1.db.prepare('INSERT INTO matches (id, challenger_id, challengee_id) VALUES (?, ?, ?)').run(id, challenger, challengee);
    },
    getInvites(user) {
        const matches = database_1.db.prepare('SELECT * FROM matches WHERE challengee_id = :challengee_id').all({ challengee_id: user });
        return matches.filter(match => match.challengee_date === '');
    },
    getInvite(id) {
        const match = database_1.db.prepare('SELECT * FROM matches WHERE id = :id').get({ id });
        if (match.challengee_date !== '') {
            return null;
        }
        return match;
    },
    acceptInvite(id) {
        return database_1.db.prepare('UPDATE matches SET challengee_date = ? WHERE id = ?').run(new Date().toISOString(), id);
    }
};
//# sourceMappingURL=MatchRepository.js.map