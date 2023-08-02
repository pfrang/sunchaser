import pyodbc
import pandas as pd
from src.python.Sql_connection.YR_Daily_Update.YR_API_REQUESTS.apiSunriseSunset import Handler
import datetime
import json
import os
import time

def addSunriseSunset(server,database,username,password,driver,country,SQL_workflow,BLOB_workflow, offset):

    conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = conn.cursor()

    #Connecting to master sql table to collect all lat, lon
    #sql="SELECT lat,lon FROM coordinates_all where country=?"

    #Filter out locations that have today pluss 10 more days (max) of forecast. This indicates that the location is already populated today
    sql='''

        Select p.lat,p.lon,p.country from(

                    Select	a.la,
                            a.lo,
                            coordinates_all.country,
                            coordinates_all.lat,
                            coordinates_all.lon
            from (
                select	lat as "la",
                        lon as "lo",
                        date
                from suntime_schedule
                where suntime_schedule.date > DATEADD(day, 10, GETUTCDATE())) as a

            Right JOIN coordinates_all
            ON a.la=coordinates_all.lat and a.lo=coordinates_all.lon
            Where a.la IS Null and a.lo IS Null) as p
            Where p.country=?
            Order by p.lat,p.lon
            offset ? rows
    '''

    # Get data from table
    cursor.execute(sql,country,offset)

    data = cursor.fetchall()

    if len(data) == 0:
        return "All locations are updated"

    #add data from sql to pandas
    df = pd.DataFrame(data)
    conn.commit()

    time_start = time.time()
    timeout_minutes = 26
    dfs = []

    for index,row in df.iterrows():
        time_stamp = time.time()
        time_difference = time_stamp - time_start
        if time_difference >= (timeout_minutes * 60):
            break  # You can choose to exit the loop when the timeout occurs
        lat=float(str(row[0]).split(",")[0][1:])
        lon=float(str(row[0]).split(",")[1])

        try:
            suntime_schedule_response=Handler(lat,lon,date=datetime.datetime.now().date()).make_api_call()
            if BLOB_workflow==True:
                dfs.append(suntime_schedule_response)

            if SQL_workflow==True:
                #delete previous records for the specific location and add new data
                cursor.execute('''
                            DELETE FROM suntime_schedule
                            WHERE lat=? and lon=?
                        ''',lat,lon)

                conn.commit()

                #add the new data to the table
                for index,suntime in suntime_schedule_response.iterrows():
                    cursor.execute('''
                    INSERT INTO suntime_schedule (lat, lon, date, sunrise_date, sunset_date, local_time)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ''', (suntime[0],suntime[1],suntime[2],suntime[3],suntime[4],suntime[5]))
                    conn.commit()
        except:
            pass

    if not dfs:
        return
    checkpoint_for_next_run=index+offset + 1
    result = [pd.concat(dfs),checkpoint_for_next_run]
    return result
