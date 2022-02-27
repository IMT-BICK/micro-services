import fs from 'fs';
import Database from 'better-sqlite3';
import { v4 as uuid } from 'uuid';

const db = new Database('matches.sql', {
    verbose: console.log
});

export default {

    getMatches() {
        return db.prepare('SELECT * FROM matches').get();
    },

    createMatch(challenger: string, challengee: string) {
        const id = uuid();
        return db.prepare('INSERT INTO matches (id, challenger_id, challengee_id) VALUES (?, ?, ?)').run(id, challenger, challengee);
    },

    applyMigrations() {
        const file = fs.readFileSync('schema.sql', 'utf-8');
        db.exec(file);
    }

}