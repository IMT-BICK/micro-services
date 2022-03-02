import Database from 'better-sqlite3';
import fs from 'fs';

export const db = new Database('arena.db', {
    verbose: console.log
});

export function applyMigrations () {
    const file = fs.readFileSync('schema.sql', 'utf-8');
    db.exec(file);
};