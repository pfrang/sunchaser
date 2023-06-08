import pyodbc 
import pandas as pd
from src.python.coordinateGenerator import GetCoordinates



class Handler:
    def __init__(self,config,lat,lon,date,distance):
       
       self.input=config["db"]
       self.server=config["server"]
       self.db=config["db"]
       self.username =config["username"]
       self.password=config["password"]
       self.driver=config["driver"]
       self.date=date
       self.edgepoints=GetCoordinates([lat,lon],distance).retrieveEdgePoints()

    def recommendation_response_sql(self):
       lat_high=self.edgepoints['northMid'][0]
       lon_high=self.edgepoints['eastMid'][1]
       lat_low=self.edgepoints['southMid'][0]
       lon_low=self.edgepoints['westMid'][1]
       date=self.date

       database=self.db
       driver=self.driver
       password=self.password
       server=self.server
       username=self.username
       
       conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
       cursor = conn.cursor()
       sql='''
              Select weather_result.*,sun.sunrise_date,sun.sunset_date from(Select t.*,local.date,local.symbol,local.temperature,local.time,local.wind,local.total_rank from(
              	Select  best_rank.lat,
                     	best_rank.lon,
                     	best_rank.group_rank,
                     	location.primary_name,
                     	location.secondary_name,
                     	location.tertiary_name,
                     	location.quaternary_name from 
              	
                     	(SELECT TOP (?) [lat]
                            ,[lon]
                            ,[date]
                            ,[group_rank]
                     	FROM [dbo].[weather_forecast_global]
       	
                     	where date=?
                     	and lat<? and lat>? and lon<? and lon>? 
                     	order by group_rank desc) as best_rank
       	
              	JOIN coordinates_locationdata location
              	ON best_rank.lat=location.lat and best_rank.lon=location.lon) as t
       	JOIN weather_forecast_local local ON t.lat=local.lat and t.lon=local.lon
       	where local.date>=?) as weather_result
       	Left JOIN suntime_schedule sun on weather_result.lat=sun.lat and weather_result.lon=sun.lon and weather_result.date=sun.date
       '''

       # Get data from table
       cursor.execute(sql,10,date,lat_high,lat_low,lon_high,lon_low,date)
       data = cursor.fetchall()

       #add data from sql to pandas 
       df = pd.DataFrame(data)#,columns=['latitude','longitude','group_rank','primary_name','secondary_name','tertiary_name','quaternary_name','date','symbol','temperature','time','wind','total_rank','sunrise_date','sunset_date'])
       conn.commit()
       return df
    

   