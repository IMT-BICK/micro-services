import { db } from '../database';
import { v4 as uuid } from 'uuid';

import { Deck } from './Deck';

export default {

    getDecks(): Deck[] {
        return db.prepare('SELECT * FROM decks').all();
    },

    createDeck(match: string, pokemon: number, user: string, hp: number): void {
        const id: string = uuid();
        db.prepare('INSERT INTO decks (id, match_id, user_id, pokemon_id, hp) VALUES (?, ?, ?, ?, ?)').run(id, match, user, pokemon, hp);
    },

    getDecksByMatchAndUser(match: string, user: string): Deck[] {
        const decks: Deck[] = db.prepare('SELECT * FROM decks WHERE match_id = :match AND user_id = :user').all({ match, user });

        return decks;
    },

    isInDeck(pokemon: number, match: string, user: string): boolean {
        const decks: Deck[] = this.getDecksByMatchAndUser(match, user);

        if (decks.find((item: Deck) => item.pokemon_id === pokemon)) {
            console.log('oui');
            return true;
        }

        return false;
    }

}