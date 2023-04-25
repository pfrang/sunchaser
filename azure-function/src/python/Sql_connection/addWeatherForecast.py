import pyodbc
import pandas as pd
from src.python.apiRequestToYr import getWeather
import datetime

server = 'sunchaser.database.windows.net'
database = 'sunchaser'
username = 'sunchaser_admin'
password = 'Sommerogsol2023'
driver= '{ODBC Driver 17 for SQL Server}'

conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = conn.cursor()

#Connecting to master sql table to collect all lat, lon
sql="SELECT lat,lon FROM coordinates_all where country=?"

# Get data from table
cursor.execute(sql,"Norway")
data = cursor.fetchall()

#add data from sql to pandas
df = pd.DataFrame(data)
conn.commit()

#loop each lat lon pair to run YR.api for sunset and sunrise
for index,row in df.iterrows():
    lat=float(str(row[0]).split(",")[0][1:])
    lon=float(str(row[0]).split(",")[1][:-1])

    forecast_schedule=getWeather(lat,lon,str(datetime.datetime.now().date()))

    #delete previous records for the specific location and add new data
    cursor.execute('''
                DELETE FROM weather_forecast
                WHERE lat=? and lon=?
               ''',lat,lon)

    conn.commit()

    #add the new data to the table
    for index,forecast in forecast_schedule.iterrows():
        cursor.execute('''
        INSERT INTO weather_forecast (lat, lon, date, time, symbol, temperature,wind,src)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (forecast[0],forecast[1],forecast[2],forecast[3],str(forecast[4]).split("_")[0],forecast[5],forecast[6],forecast[7]))
        conn.commit()
