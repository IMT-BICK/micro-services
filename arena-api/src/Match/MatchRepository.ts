import fs from 'fs';
import Database from 'better-sqlite3';
import { v4 as uuid } from 'uuid';
import { Match } from './Match';

import { db } from '../database';

export default {

    getMatches(): Match[] {
        return db.prepare('SELECT * FROM matches').all();
    },

    getMatch(id: string): Match {
        return db.prepare('SELECT * FROM matches WHERE id = :id').get({ id });
    },

    getUserMatches(user: string): Match[] {
        const matches: Match[] = db.prepare('SELECT id, challenger_id, challengee_id FROM matches WHERE challenger_id = :id OR challengee_id = :id').all({ id: user });

        return matches;
    },

    isUserMatch(user: string, match: string): boolean {
        const matches: Match[] = this.getUserMatches(user);

        if (matches.find(item => item.id === match)) {
            return true;
        }

        return false;
    },

    createMatch(challenger: string, challengee: string) {
        const id = uuid();
        return db.prepare('INSERT INTO matches (id, challenger_id, challengee_id) VALUES (?, ?, ?)').run(id, challenger, challengee);
    },

    getInvites(user: string): Match[] {
        const matches: Match[] = db.prepare('SELECT * FROM matches WHERE challengee_id = :challengee_id').all({ challengee_id: user });

        return matches.filter(match => match.challengee_date === '');
    },

    getInvite(id: string): Match {
        const match: Match = db.prepare('SELECT * FROM matches WHERE id = :id').get({ id });

        if (match.challengee_date !== '') {
            return null;
        }

        return match;
    },

    acceptInvite(id: string) {
        return db.prepare('UPDATE matches SET challengee_date = ? WHERE id = ?').run(new Date().toISOString(), id);
    }

}