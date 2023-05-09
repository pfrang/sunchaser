import pyodbc 
import pandas as pd
from src.python.googleLocationApi import googleLocationName
import datetime

server = 'sunchaser.database.windows.net'
database = 'sunchaser'
username = 'sunchaser_admin'
password = 'Sommerogsol2023'   
driver= '{ODBC Driver 17 for SQL Server}'

conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = conn.cursor()

#Connecting to master sql table to collect all lat, lon
#Continue on the last known lat or select all if table is empty
sql='''

IF EXISTS (SELECT TOP 1 lat FROM coordinates_locationdata_google ORDER BY lat DESC)
    SELECT * FROM coordinates_all
    WHERE lat >= 
        (SELECT TOP 1 lat FROM coordinates_locationdata_google ORDER BY lat DESC)
    AND country = ?
    ORDER BY lat, lon
ELSE
    SELECT * FROM coordinates_all
    WHERE country = ?
    ORDER BY lat,lon

'''

# Get data from table
cursor.execute(sql,"Norway","Norway")
data = cursor.fetchall()

#add data from sql to pandas 
df = pd.DataFrame(data)
conn.commit()
count=0
#find the first lat so that previous records for this lat can be deleted (restarted)
first_lat =float(str(df.iloc[0][0]).split(",")[0][1:])
#loop each lat lon pair
for index,row in df.iterrows():
    count+=1
    lat=float(str(row[0]).split(",")[0][1:])
    lon=float(str(row[0]).split(",")[1][:-1])
    
    if lat==first_lat:
        print("lat: {lat}, lon: {lon} is deleted")
        #delete previous records for the specific location and add new data
        cursor.execute('''
                     DELETE FROM coordinates_locationdata_google 
                     WHERE lat=? and lon=?
                    ''',lat,lon)

        conn.commit()
    
    LocationDataFrame=googleLocationName(lat,lon)

    #add the new data to the table
    for index,location in LocationDataFrame.iterrows():
        cursor.execute('''
        INSERT INTO coordinates_locationdata_google (lat, lon, group_id, long_name, short_name, types) 
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (location[0],location[1],location[2],location[3],location[4],location[5]))
        conn.commit()
    print(count)