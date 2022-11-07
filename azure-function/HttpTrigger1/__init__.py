from http.client import HTTPResponse
import logging
from urllib.error import HTTPError
import json
from src.python.handler import Handler

import azure.functions as func


def dummyData():
    dict =  {
        "rank": {
            "0.8415865140681148": [
                {
                "weatherRank": 0.8415865140681148,
                "longitude": 10.51957183934774,
                "latitude": 60.091467100832325,
                "symbol": "fair_night",
                "temperature": 4.8,
                "location": "Skien",
                "wind": 2.2,
                "time": "16:00:00",
                "date": "2022-11-05",
                },
                {
                "weatherRank": 0.8394980758278208,
                "longitude": 10.51957183934774,
                "latitude": 60.091467100832325,
                "symbol": "partlycloudy_night",
                "location": "Skien",
                "temperature": 5.0,
                "wind": 1.6,
                "time": "14:00:00",
                "date": "2022-11-05",
                }
            ],
            "0.8419709871745753": [
                {
                "weatherRank": 0.8419709871745773,
                "longitude": 10.485883103608645,
                "latitude": 60.091467100832325,
                "symbol": "fair_night",
                "location": "Oppland",
                "temperature": 4.9,
                "wind": 2.3,
                "time": "16:00:00",
                "date": "2022-11-05",
                },
                {
                "weatherRank": 0.8406957155203273,
                "longitude": 10.485883103608645,
                "latitude": 60.091467100832325,
                "symbol": "partlycloudy_night",
                "location": "Oppland",
                "temperature": 5.3,
                "wind": 2.0,
                "time": "15:00:00",
                "date": "2022-11-05",
                }
            ],
            "0.8419709871745773": [
                {
                "weatherRank": 0.8419709871745773,
                "longitude": 10.485883103608645,
                "latitude": 60.091467100832325,
                "symbol": "fair_night",
                "location": "Frysja",
                "temperature": 4.1,
                "wind": 2.1,
                "time": "14:00:00",
                "date": "2022-11-05",
                },
                {
                "weatherRank": 0.8406957155203273,
                "longitude": 10.485883103608645,
                "latitude": 60.091467100832325,
                "symbol": "partlycloudy_night",
                "location": "Frysja",
                "temperature": 5.3,
                "wind": 2.0,
                "time": "15:00:00",
                "date": "2022-11-05",
                }
            ],
            "0.841970987174332773": [
                {
                "weatherRank": 0.8419709871745773,
                "longitude": 10.485883103608645,
                "latitude": 60.091467100832325,
                "symbol": "fair_night",
                "location": "Majorstuen",
                "temperature": 4.9,
                "wind": 2.3,
                "time": "16:00:00",
                "date": "2022-11-05",
                },
                {
                "weatherRank": 0.8406957155203273,
                "longitude": 10.485883103608645,
                "latitude": 60.091467100832325,
                "symbol": "partlycloudy_night",
                "location": "Majorstuen",
                "temperature": 5.3,
                "wind": 2.0,
                "time": "15:00:00",
                "date": "2022-11-05",
                }
            ]
            }
        }
    return dict

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    allowed_methods = ["GET", "POST"]

    if req.method not in allowed_methods: return func.HttpResponse("Method not allowed", status_code=404)

    try:
        req_body = req.get_json()
        params = req_body["params"]
        initializer = Handler(params)
        logging.info(f'Proceeding with params {params}')
        response = initializer.findThebestlocation()
        response_str = json.dumps(response, indent=4)
        # response_str = json.dumps(dummyData(), indent=4)
        logging.info(f'Python done!')
        return func.HttpResponse(f"{response_str}", status_code=200)
    except Exception as e:
        return func.HttpResponse(f'Error: {e}',status_code=500)
