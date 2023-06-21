import pyodbc

def weatherRanking(server,database,username,password,driver,country):

	conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
	cursor = conn.cursor()

	cursor.execute('''
			/* This script calculates the ranking of the weather and also creates a global ranking table

	TABLE INPUT:
		1.weather_forecast; imported weather data from yr api etc
		2.symbol_rank; conversion values for symbols (sun = 1 etc.)

	TABLE OUTPUT:
		1.weather_forecast_local; local table now with a calculation of weather rank
		2.weather_forecast_global; best weather per location per day

	*/

		DROP TABLE weather_forecast_local
		DROP TABLE weather_forecast_global

		Select *, 

		s.symbol_rank*s.weight_symbol+s.temperature_rank*s.weight_temp+s.wind_rank*s.weight_wind as total_rank

		INTO weather_forecast_local

		FROM(
			SELECT *, 

			/* Calculating the ranking based on the wind, weather and temperature*/
			1/(1+EXP(-(g.symbol_alfa+g.symbol_beta*f.rank_value)))		as symbol_rank,
			exp(-0.5*POWER((f.temperature-g.temp_alfa)/g.temp_beta,2))	as temperature_rank,
			1/(1+EXP(-(g.wind_alfa+g.wind_beta*f.wind)))				as wind_rank

				FROM (
					SELECT weather_forecast.*,symbol_rank.rank_value 
			
					/* Weather symbol comes as text. Using a join to connect a numbervalue to use in the ranking formula*/
					FROM weather_forecast
					JOIN symbol_rank
					ON weather_forecast.symbol = symbol_rank.symbol) as f

					CROSS JOIN rank_variables as g) as s
		
		/* Removing the stuff we don't need anymore.*/
		Alter Table weather_forecast_local
		DROP COLUMN
			rank_value,
			symbol_alfa,
			symbol_beta,
			temp_alfa,
			temp_beta,
			wind_alfa,
			wind_beta,
			weight_symbol,
			weight_temp,
			weight_wind,
			symbol_rank,
			temperature_rank,
			wind_rank;

	/* Adding a global ranking table for fast lookup etc*/
	SELECT lat,lon,date,max(total_rank) as "group_rank"
	INTO weather_forecast_global
	FROM weather_forecast_local
	GROUP BY lat,lon,date;
		''')
	conn.commit()