import pyodbc 
import pandas as pd


server = 'sunchaser.database.windows.net'
database = 'sunchaser'
username = 'sunchaser_admin'
password = 'Sommerogsol2023'   
driver= '{ODBC Driver 17 for SQL Server}'

conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
cursor = conn.cursor()

def SQL_script():
    #Connecting to sql table to collect all data
    sql="""SELECT wf.*, 
        wl.time,
        wl.symbol,
        wl.temperature,
        wl.wind,
        wl.total_rank, 
        ss.sunrise_date,
        ss.sunset_date, 
        cl.primary_name,
        cl.secondary_name,
        cl.tertiary_name,
        cl.quaternary_name

        FROM (
            SELECT TOP 10 *
            FROM [dbo].[weather_forecast_global]
            WHERE date = ?
            AND lat BETWEEN ? AND ?
            AND lon BETWEEN ? AND ?
            ORDER BY group_rank DESC
        ) wf
        INNER JOIN [dbo].[weather_forecast_local] wl
        ON wf.lat = wl.lat
        AND wf.lon = wl.lon
        AND wf.date = wl.date
        INNER JOIN [dbo].[suntime_schedule] ss
        ON wf.lat = ss.lat
        AND wf.lon = ss.lon
        AND wf.date = ss.date
        INNER JOIN [dbo].[coordinates_locationdata] cl
        ON wf.lat = cl.lat
        AND wf.lon = cl.lon"""
    return sql

#Input from the user
dateInput='20230429'
lonEast=7.5
lonWest=6.5
latNorth=58.3
latSouth=58.2

# Get data from table
cursor.execute(SQL_script(),dateInput,latSouth,latNorth,lonWest,lonEast)
data = cursor.fetchall()


#add data from sql to pandas 
df = pd.read_sql(data,con=conn)
#df.columns=[column[0] for column in cursor.description]

# for row in df.iterrows():
#     print(row[1][0])

print(df)

