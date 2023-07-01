# This function is not intended to be invoked directly. Instead it will be
# triggered by an orchestrator function.
# Before running this sample, please:
# - create a Durable orchestration function
# - create a Durable HTTP starter function
# - add azure-functions-durable to requirements.txt
# - run pip install -r requirements.txt

import time
import requests
import os
from src.python.utils.write_to_file import write_to_file
import logging


def main(name: str) -> str:
    host = os.getenv("HOST_URL")
    code = os.getenv("DAILYYR_API_CODE")
    url = f"{host}/DailyYrApi?code={code}"  # Replace with the appropriate URL for the WeatherResult function
    logging.info(url)
    script_dir = os.path.dirname(__file__)
    rel_path = "../logs/logs.txt"
    abs_file_path = os.path.join(script_dir, rel_path)
    headers = {
        "Content-Type": "application/json"
    }
    body = name
    if(type(body) != dict):
        return "Please send a json body"

    if "localhost" in host:
        write_to_file(abs_file_path, body, "Starting processing...", False)


    try:
        # response = requests.post(url, headers=headers, json=body)
        # response.raise_for_status()
        # write_to_file(abs_file_path, f"Completed request l0l : {response.status_code + response.reason}", False)
        time.sleep(5)
        logging.info(f"Done with running {body}")
        return f"Succeeded with {body['params']['update']}"
        return response.status_code
    except requests.exceptions.RequestException as e:
        if "localhost" in host:
            write_to_file(abs_file_path, False, f"Error l0l: {e}")

        # Handle request exceptions
        print(f"Error from Python: {e}")
        return f"Error from Python: {e}"
