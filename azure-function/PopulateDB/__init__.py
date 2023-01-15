from http.client import HTTPResponse
import logging
from urllib.error import HTTPError
import azure.functions as func
import os

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    allowed_methods = ["GET", "POST"]

    if req.method not in allowed_methods: return func.HttpResponse("Method not allowed", status_code=404)

    try:
        var = os.getenv('Test')
        logging.info(var)

    except Exception as e:
        return func.HttpResponse(f'Error from Python: {e}',status_code=500)
