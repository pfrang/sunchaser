from http.client import HTTPResponse
import logging
from urllib.error import HTTPError
import json
from src.python.handler import Handler
from src.python.coordinatesfilter import ValidCoordinate
import azure.functions as func
from src.python.dummydata.dummy_data import dummyData

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    allowed_methods = ["GET", "POST"]

    if req.method not in allowed_methods: return func.HttpResponse("Method not allowed", status_code=404)

    if req.get_json()['dummy']:
        return func.HttpResponse(f"{json.dumps(dummyData(), indent=4)}", status_code=200)
    try:
        req_body = req.get_json()
        params = req_body["params"]
        validatelocation=ValidCoordinate(float(params['lat']),float(params['lon'])).validateInitialPoint()
        initializer = Handler(params)
        logging.info(f'Proceeding with params {params}')
        response = initializer.findThebestlocation()
        response_str = json.dumps(response, indent=4)
        response_str = json.dumps(dummyData(), indent=4)
        logging.info(f'Python done!')
        return func.HttpResponse(f"{response_str}", status_code=200)
    except Exception as e:
        return func.HttpResponse(f'Error: {e}',status_code=500)
