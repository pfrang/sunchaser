from http.client import HTTPResponse
import logging
import datetime
from urllib.error import HTTPError
import azure.functions as func
import os
import json
from GlobalRank.sub_script import Handler
import pandas as pd


def main(req: func.HttpRequest) -> func.HttpResponse:
    allowed_methods = ["GET", "POST"]

    if req.method not in allowed_methods: return func.HttpResponse("Method not allowed", status_code=404)

    try:
        req_body = req.get_json()
        params = req_body["params"]
        if('timer' in params):
            utc_timestamp = datetime.datetime.utcnow().replace(
                tzinfo=datetime.timezone.utc).isoformat()
            return func.HttpResponse(f"Keep warm function triggered at {utc_timestamp}", status_code=200)

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

        top = int(params.get('top') or 10)
        # If date is not provided, use today's date
        if 'date' not in params:
            date = datetime.datetime.now().strftime('%Y-%m-%d')
        else:
            date = params['date']

        if 'groups' not in params:
            groups = 10
        else:
            groups = int(params['groups'])
        
        sql_df=Handler(config,date, top,groups).bestLocations_response_sql()

        if sql_df.empty:
            return func.HttpResponse(status_code=204)
        
        dfDict = sql_df.to_dict(orient='records')
        
        response_stringified_json = json.dumps(dfDict , indent=4,default=str)
        initializer=response_stringified_json
        return func.HttpResponse(f'{initializer}',status_code=200)
    except Exception as e:
        return func.HttpResponse(f'Error from Python: {e}',status_code=500)
