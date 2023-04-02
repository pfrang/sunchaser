import requests
import json
import os
import pandas as pd


def googleLocationName(lat,lon):
    dir=os.path.dirname(__file__).split("\\sunchaser\\")[0]+"\\sunchaser\\azure-function\\"
    env_var=json.load(open(dir+"local.settings.json"))
    GOOGLE_API_KEY=env_var['Values']['GOOGLE_API_KEY'][1:-1]


    url='https://maps.googleapis.com/maps/api/geocode/json'
    latlng=str(lat)+', '+str(lon)
    key=GOOGLE_API_KEY

    url=f"{url}?latlng={latlng}&key={key}"
    
    response=requests.get(url)

    if response.status_code ==200:
        A=1+1

    response_json=json.loads(response.text)

    count=0

    group_id=[]
    long_name=[]
    short_name=[]
    types= []

    for location_group in response_json['results']:
        if "address_components" in location_group:
            count+=1
            for sub_location in location_group['address_components']:
                for location_types in sub_location['types']:
                    if location_types not in ['political','street_number','plus_code']:
                        group_id.append(count)
                        long_name.append(sub_location['long_name'])
                        short_name.append(sub_location['short_name'])
                        types.append(location_types)

    LocationDataFrame=pd.DataFrame({
        'lat':lat,
        'lon':lon,
        'group_id': group_id,
        'long_name': long_name,
        'short_name': short_name,
        'types':types
    })

    return LocationDataFrame #.drop_duplicates(subset=['long_name','short_name','types']).reset_index(drop=True)



