from http.client import HTTPResponse
import logging
from urllib.error import HTTPError
import azure.functions as func
import os
import json
from src.python.Sql_connection.YR_Daily_Update.handlerYr import Handler

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

        update={
            "suntime":"Suntim not updated",
            "weather":"Weather not updated",
            "rank":"Rank not updated",

        }

        
        
        for i in params['update']:
            if "suntime" in i:
                initializer=1 # initializer = Handler(config).updateSunsetSunrise()
                
            elif "weather" in i:
                initializer = Handler(config).updateWeatherForecast()
                
            elif "rank" in i:
                initializer = Handler(config).updateWeatherRank()
                
            else: return func.HttpResponse(f"update type {i} not allowed. {update['suntime']}, {update['weather']}, {update['rank']}", status_code=405)
            update.update({i:initializer})
        
        initializer=update

        return func.HttpResponse(f'{initializer}',status_code=200)
    except Exception as e:
        return func.HttpResponse(f'Error from Python: {e}',status_code=500)


    