from http.client import HTTPResponse
import logging
from urllib.error import HTTPError
import azure.functions as func
import os
import json
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    allowed_methods = ["GET", "POST"]

    if req.method not in allowed_methods: return func.HttpResponse("Method not allowed", status_code=404)

    try:
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
        return func.HttpResponse(f'{json.dumps(config, indent=4)}',status_code=200)
    except Exception as e:
        return func.HttpResponse(f'Error from Python: {e}',status_code=500)
