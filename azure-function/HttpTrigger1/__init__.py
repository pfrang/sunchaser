from http.client import HTTPResponse
import logging
from urllib.error import HTTPError

from src.python.handler import Handler

import azure.functions as func




def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    allowed_methods = ["GET", "POST"]

    if req.method not in allowed_methods: return func.HttpResponse("Method not allowed", status_code=404)

    try:
        req_body = req.get_json() #TODO initialize json_checker function over to see if format matches required
        params = req_body["params"]
        initializer = Handler(params)
        response = initializer.initializeCoordinatesFetcher()
        # print(response)
        return func.HttpResponse("Initializing GetCoordinates", status_code=200)
    except:
        return func.HttpResponse("Please provide a valid JSON",status_code=500)


    # if name:
    #     return func.HttpResponse(f"Hello, {name}. This HTTP triggered function executed successfully.")
    # else:
    #     return func.HttpResponse(
    #          "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
    #          status_code=200
    #     )
