import { db } from '../database';
import { v4 as uuid } from 'uuid';

import { Deck } from './Deck';
import { Match } from '../Match/Match';

export default {

    getDecks(): Deck[] {
        return db.prepare('SELECT * FROM decks').all();
    },

    getDeck(id: string): Deck {
        return db.prepare('SELECT * FROM decks WHERE id = :id').get({ id });
    },

    createDeck(match: string, pokemon: number, user: string): void {
        const id: string = uuid();
        db.prepare('INSERT INTO decks (id, match_id, user_id, pokemon_id) VALUES (?, ?, ?, ?)').run(id, match, user, pokemon);
    },

    getDecksByMatchAndUser(match: string, user: string): Deck[] {
        const decks: Deck[] = db.prepare('SELECT * FROM decks WHERE match_id = :match AND user_id = :user').all({ match, user });

        return decks;
    },

    hasEqualDecks(match: Match) {
        const challengerDecks: Deck[] = this.getDecksByMatchAndUser(match, match.challenger_id);
        const challengeeDecks: Deck[] = this.getDecksByMatchAndUser(match, match.challengee_id);

        return challengerDecks.length === challengeeDecks.length;
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