from src.python.api_client import APISOURCE
import requests
import json
import pandas as pd
from datetime import datetime


def getSunrise(lat,lon,date,offset='+01:00',days=11):
    url=f'{APISOURCE.getSunRise()}?lat={lat}&lon={lon}&date={date}&offset={offset}&days={days}'
    headers={'User-Agent':'Hjemmeprosjekt'}
    response=requests.get(url,headers=headers)

    print(f'lat:{lat},lon{lon}={response.status_code}')

    response_json=json.loads(response.text)    
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