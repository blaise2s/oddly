-- game_location enum
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'game_location') THEN
        CREATE TYPE game_location AS ENUM ('FAVORITE', 'UNDERDOG', 'NEUTRAL');
    END IF;
END $$;

-- spread_result enum
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'spread_result') THEN
        CREATE TYPE spread_result AS ENUM ('WIN', 'LOSS', 'PUSH');
    END IF;
END $$;

-- over_under_result enum
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'over_under_result') THEN
        CREATE TYPE over_under_result AS ENUM ('OVER', 'UNDER', 'PUSH');
    END IF;
END $$;

-- nfl_games table
CREATE TABLE IF NOT EXISTS nfl_games (
    id SERIAL PRIMARY KEY,
    day_of_week VARCHAR(3) NOT NULL,
    game_date DATE NOT NULL,
    time_eastern TIME NOT NULL,
    postseason BOOLEAN NOT NULL,
    game_loc game_location NOT NULL,
    favorite VARCHAR(50) NOT NULL, 
    underdog VARCHAR(50) NOT NULL, 
    spread NUMERIC(4,1) NOT NULL,
    spread_res spread_result NOT NULL,
    favorite_won BOOLEAN NOT NULL,
    tie BOOLEAN NOT NULL,
    score_favorite NUMERIC(3) NOT NULL,
    score_underdog NUMERIC(3) NOT NULL,
    overtime BOOLEAN NOT NULL,
    over_under NUMERIC(4,1) NOT NULL,
    over_under_res over_under_result NOT NULL,
    notes VARCHAR(255)
);

