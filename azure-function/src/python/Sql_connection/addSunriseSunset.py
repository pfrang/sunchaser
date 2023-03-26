import pyodbc 
import pandas as pd
from src.python.sunrise import getSunrise
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
    
    suntime_schedule=getSunrise(lat,lon,date=datetime.datetime.now().date())

    #delete previous records for the specific location and add new data
    cursor.execute('''
                DELETE FROM suntime_schedule 
                WHERE lat=? and lon=?
               ''',lat,lon)

    conn.commit()
    
    #add the new data to the table
    for index,suntime in suntime_schedule.iterrows():
        cursor.execute('''
        INSERT INTO suntime_schedule (lat, lon, date, sunrise_date, sunset_date, local_time) 
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (suntime[0],suntime[1],suntime[2],suntime[3],suntime[4],suntime[5]))
        conn.commit()