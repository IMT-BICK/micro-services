import Database from 'better-sqlite3';
import fs from 'fs';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const saltRounds = 10;

import User from './User';

const db = new Database('users.db', {
    verbose: console.log
});

export default {

    getAllUsers(): User[] {
        const query = db.prepare('SELECT id, name, score FROM users');
        const users: User[] = query.all();

        return users;
    },

    getUserById(id: string): User {
        return db.prepare('SELECT id, name, score FROM users WHERE id = :id').get({ id });
    },

    async createUser(user: User): Promise<void> {
        const id = uuid();
        const password = await bcrypt.hash(user.password, saltRounds)
        const query = db.prepare('INSERT INTO users (id, name, password, score) VALUES (?, ?, ?, ?)');
        query.run(id, user.name, password, 0);
    },

    async checkPassword({ name, password }: User): Promise<boolean|User> {
        const user = db.prepare('SELECT * FROM users WHERE name = :name').get({ name });
        
        if (user === null) {
            throw new Error('Aucun utilisateur ne correspond à ce pseudo');
        }

        console.log(`passDb : ${user.password}, password: ${password}`);

        const verified = await bcrypt.compare(password, user.password);

        if (!verified) {
            return false;
        }
        
        delete user.password;
        return user as User;
    },

    applyMigration() {
        const file = fs.readFileSync('src/schema.sql', 'utf8');
        db.exec(file);

        // const row = db.prepare('SELECT name FROM sqlite_schema WHERE type = "table" AND name = "users"').get();

        // if (!row) {
        //     console.error('Migration non appliquée');
        // }
    }

}