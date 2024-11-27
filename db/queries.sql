-- Select all games
select * from oddly.public.nfl_games game;

-- Select all postseason games
select * from oddly.public.nfl_games game where game.postseason;

-- Select Packers games
select * from oddly.public.nfl_games game where game.current_favorite = 'Green Bay Packers' order by game_date desc;

-- Select all post season games from a season
select * from oddly.public.nfl_games game where game.season = 2023;

-- Count all games
select count(*) from oddly.public.nfl_games;
-- Count all games where favorite won, percentage follows
select count(*) from oddly.public.nfl_games game where game.favorite_won;
select (count(case when favorite_won = true then 1 end) * 100.0 / count(*)) as percentage from nfl_games;
-- Count all games where underdog won, percentage follows
select count(*) from oddly.public.nfl_games game where not game.favorite_won;
select (count(case when favorite_won = false then 1 end) * 100.0 / count(*)) as percentage from nfl_games;


-- Count all postseason games
select count(*) from oddly.public.nfl_games game where game.postseason;
-- Count all postseason games where favorite won, percentage follows... can I make it more efficient?
select count(*) from oddly.public.nfl_games game where game.postseason and game.favorite_won;
select (count(case when postseason and favorite_won = true then 1 end) * 100.0 / count(case when postseason then 1 end)) as percentage from nfl_games;
-- Count all postseason games where underdog won, percentage follows... can I make it more efficient?
select count(*) from oddly.public.nfl_games game where game.postseason and not game.favorite_won;
select (count(case when postseason and favorite_won = false then 1 end) * 100.0 / count(case when postseason then 1 end)) as percentage from nfl_games;

-- Find all unique team names to create team name map
select regexp_replace(favorite, ' \(\d+\)', '') as name from nfl_games union select regexp_replace(underdog, ' \(\d+\)', '') as name from nfl_games order by name;

SELECT * FROM oddly.public.nfl_games g where
	g.season = ANY(array[2024, 2023, 2022, 2021, 2020]) and
	(g.current_favorite = ANY(array['Chicago Bears', 'Detroit Lions', 'Green Bay Packers', 'Minnesota Vikings']) or
	g.current_underdog = ANY(array['Chicago Bears', 'Detroit Lions', 'Green Bay Packers', 'Minnesota Vikings'])) and 
	g.tie;
