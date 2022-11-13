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

        if len(response_json['navn'])>0:
            response_json=response_json['navn'][0]['stedsnavn'][0]['skrivemåte']
        else:
            response_json='location not found'

        df = pd.DataFrame({"location":[response_json]})
        return df

    def MunicipalityNamefromAPI(self):

        lat=self.lat
        lon=self.lon
        
        headers={'User-Agent':'Hjemmeprosjekt'}

        ApiURL=APISOURCE.getKommune()
        FullApiURL=f'{ApiURL}nord={lat}&ost={lon}'
        response=requests.get(FullApiURL,headers=headers)
        
        if response.status_code is 200:
            response_json=response.json()

            if len(response_json['kommunenavn'])>0:
                response_json=response_json['kommunenavn']
            else:
                response_json='location not found'
        
        else: response_json='Outside of Norway'

        return response_json