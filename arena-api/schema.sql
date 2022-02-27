CREATE TABLE IF NOT EXISTS matches (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    challenger_id VARCHAR(255) NOT NULL,
    challengee_id VARCHAR(255) NOT NULL,
    challengee_date TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS decks (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    match_id VARCHAR(255) NOT NULL,
    pokemon_id INTEGER(255) NOT NULL,
    played INTEGER(255) NOT NULL CHECK (played IN (0, 1)) DEFAULT 0,
    hp INTEGER(255) NOT NULL,
    FOREIGN KEY(match_id) REFERENCES matches(id)
);