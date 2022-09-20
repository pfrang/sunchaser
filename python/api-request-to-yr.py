from time import strftime, time
import requests
import json
from datetime import datetime

def getWeather(lat,lon,travelDate):
    url=f'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}'
    headers={'User-Agent':'Hjemmeprosjekt'}
    response=requests.get(url,headers=headers)

    response_json=json.loads(response.text)
    # print(json.dumps(response_json, indent=4))
    
    response_json=response_json["properties"]["timeseries"]
    times = []
    next1hourSymbol= []
    for i in response_json:
        if("next_6_hours" in i["data"].keys()):
            times.append(i["time"])
            next1hourSymbol.append(i["data"]["next_6_hours"]["summary"]["symbol_code"])
            
    return 

        
getWeather(60,10,"2022-07-20")

datetime_str="2022-07-20"
datetime_object = datetime.strptime(datetime_str, '%Y-%m-%d').isoformat()
print(datetime_object)