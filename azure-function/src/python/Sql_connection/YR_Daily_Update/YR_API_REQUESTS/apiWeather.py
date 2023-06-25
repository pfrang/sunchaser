from time import strftime, time
import requests
import json
from datetime import datetime
import pandas as pd
from src.python.api_client import APISOURCE
from src.python.Sql_connection.API_error_log_to_sql import Handler as Error

class Handler:
    def __init__(self,lat,lon) -> None:
       
       self.lat=lat
       self.lon=lon
       self.apisource=APISOURCE.getYR()
       

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
        apisource=self.apisource

        url=f'{apisource}?lat={lat}&lon={lon}'
        headers={'User-Agent':'Hjemmeprosjekt'}
        return requests.get(url,headers=headers)

    def handle_result(self,response):
        lat=self.lat
        lon=self.lon
        response_json=response.json()    
        response_json=response_json['properties']["timeseries"]

        times = []
        weatherDate=[]
        weatherTime=[]
        weatherSymbol= []
        weatherTemperature=[]
        weatherWind=[]
        latArr=[]
        lonArr=[]

        for i in response_json:
            if("next_6_hours" in i["data"].keys()):
                weatherDate.append(str(i["time"]).split('T')[0])
                weatherTime.append(str(i["time"]).split('T')[1][:-1])
                weatherTemperature.append(i["data"]["instant"]["details"]["air_temperature"])
                weatherWind.append(i["data"]["instant"]["details"]["wind_speed"])
                weatherSymbol.append(i["data"]["next_6_hours"]["summary"]["symbol_code"])
                latArr.append(lat)
                lonArr.append(lon)

        weatherDataDataFrame=pd.DataFrame({
            'latitude': latArr,
            'longitude': lonArr,
            'date':weatherDate,
            'time':weatherTime,
            'symbol':weatherSymbol,
            'temperature': weatherTemperature,
            'wind': weatherWind,
            'src': "yr api",
        })
        return weatherDataDataFrame
    
    def error_handeling(self,response_code):
        return Error(self.lat,self.lon,self.apisource,response_code).logError()