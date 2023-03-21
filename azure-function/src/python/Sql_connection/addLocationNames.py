import pyodbc 
import pandas as pd

server = 'sunchaser.database.windows.net'
database = 'sunchaser'
username = 'sunchaser_admin'
password = 'Sommerogsol2023'   
driver= '{ODBC Driver 17 for SQL Server}'

conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = conn.cursor()


sql="SELECT lat,lon FROM coordinates_all where country='Norway'"

# Get data from table
cursor.execute(sql)
data = cursor.fetchall()

df = pd.DataFrame(data)
conn.commit()

for index,row in df.iterrows():
    lat=float(str(row[0]).split(",")[0][1:])
    lon=float(str(row[0]).split(",")[1][:-1])
    
    primary_name="ABC"
    secondary_name="ABC"
    tertiary_name="ABC"
    quaternary_name="ABC"

    cursor.execute('''
    INSERT INTO coordinates_locationdata (lat, lon, primary_name, secondary_name, tertiary_name, quaternary_name) 
    VALUES (?, ?, ?, ?, ?, ?)
    ''', (lat, lon, primary_name, secondary_name, tertiary_name, quaternary_name))

    conn.commit()