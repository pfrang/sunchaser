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
sql="SELECT lat,lon FROM coordinates_all where country=?"

# Get data from table
cursor.execute(sql,"Norway")
data = cursor.fetchall()

#add data from sql to pandas 
df = pd.DataFrame(data)
conn.commit()
count=0
#loop each lat lon pair to run YR.api for sunset and sunrise
for index,row in df.iterrows():
    count+=1
    lat=float(str(row[0]).split(",")[0][1:])
    lon=float(str(row[0]).split(",")[1][:-1])
    
    LocationDataFrame=googleLocationName(lat,lon)

    #delete previous records for the specific location and add new data
    # cursor.execute('''
    #             DELETE FROM coordinates_locationdata_google 
    #             WHERE lat=? and lon=?
    #            ''',lat,lon)

    conn.commit()
    
    #add the new data to the table
    for index,location in LocationDataFrame.iterrows():
        cursor.execute('''
        INSERT INTO coordinates_locationdata_google (lat, lon, group_id, long_name, short_name, types) 
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (location[0],location[1],location[2],location[3],location[4],location[5]))
        conn.commit()
    print(count)