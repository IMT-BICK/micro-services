CREATE TABLE IF NOT EXISTS matches (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    challenger_id VARCHAR(255) NOT NULL,
    challengee_id VARCHAR(255) NOT NULL,
    challengee_date TEXT DEFAULT ''
);