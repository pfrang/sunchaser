from src.python.api_client import APISOURCE
import requests
import json
import pandas as pd
from datetime import datetime
from src.python.Sql_connection.API_error_log_to_sql import Handler as Error
import logging
class Handler:
    def __init__(self,lat,lon,date) -> None:
       
       self.lat=lat
       self.lon=lon
       self.date=date
       self.offset='+01:00'
       self.days=11
       self.apisource=APISOURCE.getSunRise()
       self.apiuseragent=APISOURCE.getUserAgent()
       

    def make_api_call(self):

        try:
            response =self.get_result()
            response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
            return self.handle_result(response)
        
        except requests.exceptions.HTTPError as err:
            self.error_handeling(response.status_code)
            if response.status_code == 503:
                # Handle 503 error
                print("Service Unavailable. Retry later or try another key.")
            else:
                # Handle other HTTP errors
                print(f"HTTP Error: {err}")
        except requests.exceptions.RequestException as err:
            # Handle other request exceptions (e.g., connection error)
            print(f"Request Exception: {err}")
        except Exception as err:
            # Handle any other exceptions
            print(f"Error: {err}")
            


    def get_result(self):

        lat=self.lat
        lon=self.lon
        date=self.date
        offset=self.offset
        days=self.days
        apisource=self.apisource
        apiuseragent=self.apiuseragent

        url=f'{apisource}?lat={lat}&lon={lon}&date={date}&offset={offset}&days={days}'
        logging.info(url)
        headers={'User-Agent':apiuseragent}
       
        return requests.get(url,headers=headers)

    def handle_result(self,response):
        lat=self.lat
        lon=self.lon
        offset=self.offset
        response_json=response.json()  
        response_json=response_json["location"]["time"]

        date=[]
        sunriseDate=[]
        sunsetDate=[]

        date_format_full="%Y-%m-%dT%H:%M:%S"
        

        for i in response_json:
            if "sunset" in i:
                sunrise_var=datetime.strptime(str(i["sunrise"]["time"]).split("+")[0],date_format_full)
                date.append(sunrise_var.date())
                sunriseDate.append(sunrise_var)
                sunsetDate.append(datetime.strptime(str(i["sunset"]["time"]).split("+")[0],date_format_full))

        sunSchedule=pd.DataFrame({
            'latitude': lat,
            'longitude': lon,
            'date': date,
            'sunriseDate': sunriseDate,
            'sunsetDate': sunsetDate,
            'localTime' : offset
            
        })
        return sunSchedule
    
    def error_handeling(self,response_code):
        return Error(self.lat,self.lon,self.apisource,response_code).logError()