import datetime
import logging
import requests
import os

import azure.functions as func


def main(mytimer: func.TimerRequest) -> None:
    utc_timestamp = datetime.datetime.utcnow().replace(
        tzinfo=datetime.timezone.utc).isoformat()

    if mytimer.past_due:
        logging.info('The timer is past due!')


    payload = {
        "params": {
            "timer": True
        }
    }

    HOST = f"{os.getenv('HOST_URL')}/WeatherResult?code={os.getenv('HOST_CODE')}"

    try:
        response = requests.post(HOST, json=payload)
    except:
        logging.info(f"ERROR Trigger function, couldnt trigger /WeatherResult at {utc_timestamp}")
