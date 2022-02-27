"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const saltRounds = 10;
const db = new better_sqlite3_1.default('users.db', {
    verbose: console.log
});
exports.default = {
    getAllUsers() {
        const query = db.prepare('SELECT id, name, score FROM users');
        const users = query.all();
        return users;
    },
    getUserById(id) {
        return db.prepare('SELECT id, name, score FROM users WHERE id = :id').get({ id });
    },
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const password = yield bcrypt_1.default.hash(user.password, saltRounds);
            const query = db.prepare('INSERT INTO users (id, name, password, score) VALUES (?, ?, ?, ?)');
            query.run(id, user.name, password, 0);
        });
    },
    checkPassword({ name, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = db.prepare('SELECT * FROM users WHERE name = :name').get({ name });
            if (user === null) {
                throw new Error('Aucun utilisateur ne correspond à ce pseudo');
            }
            console.log(`passDb : ${user.password}, password: ${password}`);
            const verified = yield bcrypt_1.default.compare(password, user.password);
            if (!verified) {
                return false;
            }
            delete user.password;
            return user;
        });
    },
    applyMigration() {
        const file = fs_1.default.readFileSync('src/schema.sql', 'utf8');
        db.exec(file);
        // const row = db.prepare('SELECT name FROM sqlite_schema WHERE type = "table" AND name = "users"').get();
        // if (!row) {
        //     console.error('Migration non appliquée');
        // }
    }
};
//# sourceMappingURL=UserRepository.js.map