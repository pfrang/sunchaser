from http.client import HTTPResponse
import logging
from urllib.error import HTTPError
import azure.functions as func
import os
import json
from WeatherResult import Handler
import pandas as pd


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    allowed_methods = ["GET", "POST"]

    if req.method not in allowed_methods: return func.HttpResponse("Method not allowed", status_code=404)

    try:
        req_body = req.get_json()
        params = req_body["params"]

        server = os.getenv('SQL_Server')
        db = os.getenv('SQL_Database')
        username = os.getenv('SQL_Username')
        password = os.getenv('SQL_Password')
        driver = os.getenv('SQL_Driver')
        config = {
            "server": server,
            "db": db,
            "username": username,
            "password": password,
            "driver": driver
        }

        sql_df=Handler.Handler(config,float(params['lat']),float(params['lon']),params['date'],float(params['distance'])).recommendation_response_sql()
        
        StartLocation = {
            "latitude": params['lat'],
            "longitude": params['lon']
            }
        
        dfDict = sql_df.groupby('group_rank').apply(lambda x:x[['latitude','longitude','primary_name','secondary_name','tertiary_name','quaternary_name','date','symbol','temperature','time','wind','rank','sunrise_time','sunset_time']].to_dict(orient='records')).to_dict()
        tmpDict = {'userlocation':StartLocation,'ranks': dfDict}
        
        response_str = json.dumps(tmpDict , indent=4,default=str)

        initializer=response_str

        return func.HttpResponse(f'{initializer}',status_code=200)
    except Exception as e:
        return func.HttpResponse(f'Error from Python: {e}',status_code=500)