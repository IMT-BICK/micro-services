CREATE TABLE IF NOT EXISTS matches (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    challenger_id VARCHAR(255) NOT NULL,
    challengee_id VARCHAR(255) NOT NULL,
    challengee_date TEXT DEFAULT '',
    started INTEGER(255) NOT NULL CHECK (started IN (0, 1)) DEFAULT 0,
    winner_id VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS decks (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    match_id VARCHAR(255) NOT NULL,
    pokemon_id INTEGER(255) NOT NULL,
    played INTEGER(255) NOT NULL CHECK (played IN (0, 1)) DEFAULT 0,
    FOREIGN KEY(match_id) REFERENCES matches(id)
);

CREATE TABLE IF NOT EXISTS rounds (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    challenger_deck_id VARCHAR(255) DEFAULT NULL,
    challengee_deck_id VARCHAR(255) DEFAULT NULL,
    winning_deck_id VARCHAR(255) DEFAULT NULL,
    match_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(challenger_deck_id) REFERENCES decks(id),
    FOREIGN KEY(challengee_deck_id) REFERENCES decks(id),
    FOREIGN KEY(winning_deck_id) REFERENCES decks(id),
    FOREIGN KEY(match_id) REFERENCES matches(id)
);