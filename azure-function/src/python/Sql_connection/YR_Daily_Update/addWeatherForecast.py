import pyodbc
import pandas as pd
from src.python.Sql_connection.YR_Daily_Update.YR_API_REQUESTS.apiWeather import Handler
from datetime import datetime
import logging
import json
import time

def weatherForecast(server,database,username,password,driver,country,SQL_workflow,BLOB_workflow, offset, step):

    conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = conn.cursor()

    #Connecting to master sql table to collect all lat, lon
    #sql="SELECT lat,lon FROM coordinates_all where country=?"

    sql='''
    Select res.lat,res.lon,res.country from (Select filter.wind,co.lat,co.lon,co.country from (Select * from weather_forecast
    where date>DATEADD(day, 9, GETUTCDATE())) as filter
    Right JOIN coordinates_all as co ON
    co.lat=filter.lat and co.lon=filter.lon
    where filter.wind is NULL) as res
    where res.country=?
    order by res.lat, res.lon
    offset ? rows
    Fetch Next ? ROWS ONLY;
    '''

    # Get data from table
    cursor.execute(sql,country,offset, step)

    data = cursor.fetchall()

    if len(data) == 0:
        return "All locations are updated"

    #add data from sql to pandas
    df = pd.DataFrame(data)
    conn.commit()

    time_start = time.time()
    timeout_minutes = 26
    dfs = []

    #loop each lat lon pair to run YR.api for sunset and sunrise
    for index,row in df.iterrows():
        time_stamp = time.time()
        time_difference = time_stamp - time_start
        if time_difference >= (timeout_minutes * 60):
            break  # You can choose to exit the loop when the timeout occurs
        lat=float(str(row[0]).split(",")[0][1:])
        lon=float(str(row[0]).split(",")[1])

        try:

            forecast_schedule_response=Handler(lat,lon).make_api_call()

            if BLOB_workflow==True:
                dfs.append(forecast_schedule_response)

            if SQL_workflow==True:
                #delete previous records for the specific location and add new data
                cursor.execute('''
                            DELETE FROM weather_forecast
                            WHERE lat=? and lon=?
                        ''',lat,lon)

                conn.commit()

                #add the new data to the table
                for index,forecast in forecast_schedule_response.iterrows():
                    cursor.execute('''
                    INSERT INTO weather_forecast (lat, lon, date, time, symbol, temperature,wind,src)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (forecast[0],forecast[1],forecast[2],forecast[3],str(forecast[4]).split("_")[0],forecast[5],forecast[6],forecast[7]))
                    conn.commit()
        except Exception as e:
            print(f"Encountered error on lat: {lat} lon: {lon}, error: {e} ")
            pass
    if not dfs:
        return
    checkpoint_for_next_run=index+offset + 1
    result = [pd.concat(dfs),checkpoint_for_next_run]
    return result
