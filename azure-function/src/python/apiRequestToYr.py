from time import strftime, time
import requests
import json
from datetime import datetime
import pandas as pd
from src.python.api_client import APISOURCE

def getWeather(lat,lon,travelDate):
    url=f'{APISOURCE.getYR()}?lat={lat}&lon={lon}'
    headers={'User-Agent':'Hjemmeprosjekt'}
    response=requests.get(url,headers=headers)

    response_json=json.loads(response.text)

    response_json=response_json["properties"]["timeseries"]
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
    })
    return weatherDataDataFrame
