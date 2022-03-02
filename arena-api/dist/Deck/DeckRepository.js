"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const uuid_1 = require("uuid");
exports.default = {
    getDecks() {
        return database_1.db.prepare('SELECT * FROM decks').all();
    },
    createDeck(match, pokemon, user, hp) {
        const id = (0, uuid_1.v4)();
        database_1.db.prepare('INSERT INTO decks (id, match_id, user_id, pokemon_id, hp) VALUES (?, ?, ?, ?, ?)').run(id, match, user, pokemon, hp);
    },
    getDecksByMatchAndUser(match, user) {
        const decks = database_1.db.prepare('SELECT * FROM decks WHERE match_id = :match AND user_id = :user').all({ match, user });
        return decks;
    },
    isInDeck(pokemon, match, user) {
        const decks = this.getDecksByMatchAndUser(match, user);
        if (decks.find((item) => item.pokemon_id === pokemon)) {
            console.log('oui');
            return true;
        }
        return false;
    }
};
//# sourceMappingURL=DeckRepository.js.map