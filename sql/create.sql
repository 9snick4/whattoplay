CREATE TABLE night (
    nightid SERIAL PRIMARY KEY,
    hostusername VARCHAR(50) NOT NULL,
    nightname VARCHAR(100),
    hostname VARCHAR(50),
    day DATE
);

CREATE TABLE choice (
    choiceid SERIAL PRIMARY KEY,
    nightid INT NOT NULL REFERENCES night(nightid),
    gameid INT NOT NULL,
    gamername VARCHAR(50),
    UNIQUE (gameid, gamername)
);

