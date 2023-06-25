import os
import pyodbc
from datetime import datetime

class Handler:
    def __init__(self,lat,lon,api_request,response_code) -> None:
       
        self.server = os.getenv('SQL_Server')
        self.database = os.getenv('SQL_Database')
        self.username = os.getenv('SQL_Username')
        self.password = os.getenv('SQL_Password')
        self.driver = os.getenv('SQL_Driver')
        self.lat=lat
        self.lon=lon
        self.api_request=api_request
        self.response_code=response_code
        
    
    def logError(self):
        server=self.server
        database=self.database
        username=self.username
        password=self.password
        driver=self.driver
        lat=self.lat
        lon=self.lon
        api_request=self.api_request
        response_code=self.response_code
        
        time=datetime.now()
        solved=0 #0=Not fiexed, 1=Fixed

        conn=pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = conn.cursor()

        #Log error event to sql        

        sql='''
            INSERT INTO error_handling (lat, lon, api_request, response_code, time, solved)
            VALUES (?, ?, ?, ?, ?, ?)
            '''

        
        cursor.execute(sql,lat,lon,api_request,response_code,time,solved)
        conn.commit()
        
        return "logged error"