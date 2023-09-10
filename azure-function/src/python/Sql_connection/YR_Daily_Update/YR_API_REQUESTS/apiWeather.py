from time import time
import requests
import pandas as pd
from src.python.api_client import APISOURCE
from src.python.Sql_connection.API_error_log_to_sql import Handler as CustomError
import time
class Handler:
    def __init__(self,lat,lon) -> None:

       self.lat=lat
       self.lon=lon
       self.apisource=APISOURCE.getYR()
       self.apiuseragent=APISOURCE.getUserAgent()

    def make_api_call(self):
        try:
            time_now_api = time.time()
            response =self.get_result()
            if(time.time() - time_now_api > 3):
                print(f"Request was very slow for time: {time.time() - time_now_api} seconds, status code {response.status_code}, lat: {self.lat}, lon: {self.lon}")
            response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes

            return self.handle_result(response)

        except requests.exceptions.HTTPError as err:

            # self.error_handeling(response.status_code)
            raise Exception(err)
        except requests.exceptions.RequestException as err:
            # Handle other request exceptions (e.g., connection error)
            raise Exception(err)
        except Exception as err:
            # Handle any other exceptions
            raise Exception(err)


    def get_result(self):
        lat=self.lat
        lon=self.lon
        apisource=self.apisource
        apiuseragent=self.apiuseragent

        url=f'{apisource}?lat={lat}&lon={lon}'
        headers={'User-Agent':apiuseragent}
        return requests.get(url,headers=headers, timeout=7)

    def handle_result(self,response):
        lat=self.lat
        lon=self.lon
        response_json=response.json()
        response_json=response_json['properties']["timeseries"]

        weatherDate=[]
        weatherTime=[]
        weatherSymbol= []
        weatherTemperature=[]
        weatherWind=[]
        latArr=[]
        lonArr=[]


        for i in response_json:
            if("next_1_hours" in i["data"].keys()):
                weatherDate.append(str(i["time"]).split('T')[0])
                weatherTime.append(str(i["time"]).split('T')[1][:-1])
                weatherTemperature.append(i["data"]["instant"]["details"]["air_temperature"])
                weatherWind.append(i["data"]["instant"]["details"]["wind_speed"])
                weatherSymbol.append(i["data"]["next_1_hours"]["summary"]["symbol_code"].split("_")[0])
                latArr.append(lat)
                lonArr.append(lon)
            elif("next_6_hours" in i["data"].keys()):
                weatherDate.append(str(i["time"]).split('T')[0])
                weatherTime.append(str(i["time"]).split('T')[1][:-1])
                weatherTemperature.append(i["data"]["instant"]["details"]["air_temperature"])
                weatherWind.append(i["data"]["instant"]["details"]["wind_speed"])
                weatherSymbol.append(i["data"]["next_6_hours"]["summary"]["symbol_code"].split("_")[0])
                latArr.append(lat)
                lonArr.append(lon)

        weatherDataDataFrame=pd.DataFrame({
            'lat': latArr,
            'lon': lonArr,
            'date':weatherDate,
            'time':weatherTime,
            'symbol':weatherSymbol,
            'temperature': weatherTemperature,
            'wind': weatherWind,
            'src': "yr api",
        })
        return weatherDataDataFrame

    def error_handeling(self,response_code):
        return CustomError(self.lat,self.lon,self.apisource,response_code).logError()
