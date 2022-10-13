from time import strftime, time
import requests
import json
from datetime import datetime
import pandas as pd

def getWeather(lat,lon,travelDate):
    url=f'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}'
    headers={'User-Agent':'Hjemmeprosjekt'}
    response=requests.get(url,headers=headers)

    response_json=json.loads(response.text)
    # print(json.dumps(response_json, indent=4))

    response_json=response_json["properties"]["timeseries"]
    times = []
    weatherDate=[]
    weatherTime=[]
    weatherSymbol= []
    weatherTemperature=[]
    weatherWind=[]
    for i in response_json:


        if("next_6_hours" in i["data"].keys()):

            weatherDate.append(str(i["time"]).split('T')[0])
            weatherTime.append(str(i["time"]).split('T')[1][:-1])
            weatherTemperature.append(i["data"]["instant"]["details"]["air_temperature"])
            weatherWind.append(i["data"]["instant"]["details"]["wind_speed"])
            weatherSymbol.append(i["data"]["next_6_hours"]["summary"]["symbol_code"])

    weatherDataDataFrame=pd.DataFrame({
        'Date':weatherDate,
        'Time':weatherTime,
        'Symbol':weatherSymbol,
        'Temperature': weatherTemperature,
        'Wind': weatherWind
    })

    return weatherDataDataFrame



print(getWeather(60,10,"2022-10-09"))