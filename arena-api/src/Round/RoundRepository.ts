import { db } from '../database';
import { Round } from './Round';

export default {

    hasWaitingChallengerRound(match: string): boolean|Round {
        const rounds: Round[] = db.prepare('SELECT * FROM rounds WHERE match_id = :match AND challenger_deck_id = NULL').all({ match });
        
        if (rounds.length === 0) {
            return false;
        }

        return rounds[0];
    },

    hasWaitingChallengeeRound(match: string): boolean|Round {
        const rounds: Round[] = db.prepare('SELECT * FROM rounds WHERE match_id = :match AND challengee_deck_id = NULL').all({ match });

        if (rounds.length === 0) {
            return false;
        }

        return rounds[0];
    }

};