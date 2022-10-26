from http.client import responses
from src.python.api_client import APISOURCE
import requests
import json
import pandas as pd
class GETLOCATIONINFO:

    def __init__(self,lat,lon):
        self.lat=lat
        self.lon=lon

    def LocationNamefromAPI(self):
        lat=self.lat
        lon=self.lon

        headers={'User-Agent':'Hjemmeprosjekt'}

        ApiURL=APISOURCE.getKartverket()
        FullApiURL=f'{ApiURL}nord={lat}&ost={lon}'
        print(FullApiURL)
        response=requests.get(FullApiURL,headers=headers)
        response_json=json.loads(response.text)

        if len(response_json['navn'])>0:
            response_json=response_json['navn'][0]['stedsnavn'][0]['skrivemåte']
        else:
            response_json='location not found'

        df = pd.DataFrame({"Location":[response_json]})

        print(df)
        return df
