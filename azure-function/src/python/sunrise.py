from src.python.api_client import APISOURCE
import requests
import json
import pandas as pd
from datetime import datetime
lat='59.93'
lon='10.72'
date='2023-03-14'

def getSunrise(lat,lon,date,offset='+01:00',days=9):
    url=f'{APISOURCE.getSunRise()}?lat={lat}&lon={lon}&date={date}&offset={offset}&days={days}'
    headers={'User-Agent':'Hjemmeprosjekt'}
    response=requests.get(url,headers=headers)

    response_json=json.loads(response.text)    
    response_json=response_json["location"]["time"]

    sunriseDate=[]
    sunsetDate=[]

    date_format="%Y-%m-%dT%H:%M:%S"

    for i in response_json:
        if "sunset" in i:
            sunriseDate.append(datetime.strptime(str(i["sunrise"]["time"]).split("+")[0],date_format))
            sunsetDate.append(datetime.strptime(str(i["sunset"]["time"]).split("+")[0],date_format))



    sunSchedule=pd.DataFrame({
        'latitude': lat,
        'longitude': lon,
        'sunriseDate': sunriseDate,
        'sunsetDate': sunsetDate,
        'localTime' : offset
        
    })
    return sunSchedule


print(getSunrise(lat,lon,date))