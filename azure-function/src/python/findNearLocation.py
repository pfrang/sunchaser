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

        response=requests.get(FullApiURL,headers=headers)
        response_json=json.loads(response.text)
        response_json=response_json['navn'][0]['stedsnavn'][0]['skrivemåte']

        print(response_json)

        df = pd.DataFrame({"Location":[response_json]})

        if response_json=='':response_json='location not found'

        return df
