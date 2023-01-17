import pyodbc 

server = 'sunchaser.database.windows.net'
database = 'sunchaser'
username = 'sunchaser_admin'
password = 'Sommerogsol2023'   
driver= '{ODBC Driver 17 for SQL Server}'

conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = conn.cursor()

# Example data
lat = 50.0
lon = -120.0
date = "2022-01-01"
time = "12:00:00"
weather_symbol_id_fk = 1
temperature = 20.5
wind = 5.3
score = 3.2
src = "API YR"


# Insert data into Weather_data table
cursor.execute('''
    INSERT INTO Weather_data (lat, lon, date, time, weather_symbol_id_fk, temperature, wind, score, src) 
    VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)
''', (lat, lon, date, time, weather_symbol_id_fk, temperature, wind, score, src))

conn.commit()

